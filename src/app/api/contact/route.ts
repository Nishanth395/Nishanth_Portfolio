import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { getFirestoreDb } from "@/lib/firebaseAdmin";
import { getResendClient, CONTACT_RECIPIENT_EMAIL, CONTACT_SENDER_EMAIL } from "@/lib/resend";
import { FieldValue } from "firebase-admin/firestore";

// Allowed opportunity intents
const ALLOWED_INTENTS = [
  "Internship / Technical Role",
  "Startup Collaboration",
  "Client Web Services",
  "Founder Conversations",
  "General Enquiry",
] as const;

type AllowedIntent = (typeof ALLOWED_INTENTS)[number];

// Simple in-memory rate limiting map: IP -> array of request timestamps (epoch ms)
// LIMITATION NOTE: In serverless environments (Netlify / Vercel), in-memory state is local to each
// container instance and resets when instances spin down. For distributed, persistent production rate limiting,
// an external store like Upstash Redis (@upstash/ratelimit) or Firestore atomic counters should be integrated.
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out timestamps older than the active window
  const activeTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, activeTimestamps);
    return true;
  }
  
  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Request payload size check (max 16KB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 16384) {
      return NextResponse.json(
        { success: false, error: "Request payload exceeds allowed size limit (16KB)." },
        { status: 413 }
      );
    }

    // 2. Client IP & basic rate limiting
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    if (isRateLimited(clientIp)) {
      console.warn(`[Contact API] Rate limit exceeded for IP: ${clientIp.slice(0, 7)}***`);
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many submission attempts from this network. Please wait a few minutes before trying again, or email Nishanth directly at adepunishanth1@gmail.com.",
        },
        { status: 429 }
      );
    }

    // 3. Parse JSON body safely
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Malformed request payload." },
        { status: 400 }
      );
    }

    const { name, email, organization, intent, message, honeypot } = body as Record<
      string,
      unknown
    >;

    // 4. Server-Side Spam Honeypot Detection
    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      console.warn(`[Contact API] Automated bot trap triggered. Rejected submission.`);
      return NextResponse.json(
        { success: false, error: "Automated submission rejected." },
        { status: 400 }
      );
    }

    // 5. Field Validations
    // Name validation
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }
    const cleanName = name.trim();
    if (cleanName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Name must not exceed 100 characters." },
        { status: 400 }
      );
    }

    // Email validation
    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }
    const cleanEmail = email.trim();
    if (cleanEmail.length > 254) {
      return NextResponse.json(
        { success: false, error: "Email address must not exceed 254 characters." },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Organization validation (optional)
    let cleanOrg = "";
    if (typeof organization === "string") {
      cleanOrg = organization.trim();
      if (cleanOrg.length > 120) {
        return NextResponse.json(
          { success: false, error: "Organization name must not exceed 120 characters." },
          { status: 400 }
        );
      }
    }

    // Intent validation
    if (typeof intent !== "string" || !ALLOWED_INTENTS.includes(intent as AllowedIntent)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid intent specified. Allowed options: ${ALLOWED_INTENTS.join(", ")}`,
        },
        { status: 400 }
      );
    }
    const cleanIntent = intent as AllowedIntent;

    // Message validation
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 }
      );
    }
    const cleanMessage = message.trim();
    if (cleanMessage.length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must contain at least 10 characters." },
        { status: 400 }
      );
    }
    if (cleanMessage.length > 3000) {
      return NextResponse.json(
        { success: false, error: "Message must not exceed 3000 characters." },
        { status: 400 }
      );
    }

    // Safe sanitized logging (zero personal message content logged)
    const emailDomain = cleanEmail.split("@")[1] || "unknown";
    console.log(
      `[Contact API] Processing dispatch | Intent: "${cleanIntent}" | Email Domain: "@${emailDomain}" | Client IP: ${clientIp.slice(0, 7)}***`
    );

    // 6. Firestore Storage
    let docId = "";
    const db = getFirestoreDb();
    const submissionRecord = {
      name: cleanName,
      email: cleanEmail,
      organization: cleanOrg || null,
      intent: cleanIntent,
      message: cleanMessage,
      createdAt: FieldValue.serverTimestamp(),
      receivedAt: new Date().toISOString(),
      emailDeliveryStatus: "pending",
      environment: process.env.NODE_ENV || "production",
    };

    try {
      const docRef = await db.collection("contact_submissions").add(submissionRecord);
      docId = docRef.id;
    } catch (dbErr: unknown) {
      const dbErrMsg = dbErr instanceof Error ? dbErr.message : "Database error";
      console.error(`[Contact API] Firestore storage failed: ${dbErrMsg}`);
      // Per instructions: If Firestore storage fails, DO NOT report success. Return 500 error.
      return NextResponse.json(
        {
          success: false,
          savedToDatabase: false,
          error:
            "Unable to record your dispatch in our records at this moment. Please email Nishanth directly at adepunishanth1@gmail.com.",
        },
        { status: 500 }
      );
    }

    // 7. Resend Notification Email
    let emailSent = false;
    try {
      const resend = getResendClient();
      const sendResult = await resend.emails.send({
        from: `Nishanth Portfolio Dispatch <${CONTACT_SENDER_EMAIL}>`,
        to: [CONTACT_RECIPIENT_EMAIL],
        replyTo: cleanEmail,
        subject: `[Portfolio Dispatch // ${cleanIntent}] from ${cleanName}`,
        text: `NEW COLLABORATION DISPATCH
--------------------------------------------------
Sender: ${cleanName} (${cleanEmail})
Organization: ${cleanOrg || "Independent"}
Intent: ${cleanIntent}
Database Record ID: ${docId}
Received At: ${new Date().toUTCString()}
--------------------------------------------------

Message:
${cleanMessage}

--------------------------------------------------
Reply directly to this email to contact the sender.`,
        html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #D8D4CC; background-color: #FAF8F5;">
  <div style="border-bottom: 2px solid #1A4BFF; padding-bottom: 12px; margin-bottom: 20px;">
    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #1A4BFF; font-weight: 600;">NEW COLLABORATION DISPATCH</div>
    <div style="font-size: 20px; font-weight: 600; color: #0D0D0E; margin-top: 4px;">Nishanth Portfolio Gateway</div>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
    <tr>
      <td style="padding: 8px 0; color: #76746E; width: 120px; font-weight: 600;">SENDER:</td>
      <td style="padding: 8px 0; color: #0D0D0E; font-weight: 600;">${cleanName} (<a href="mailto:${cleanEmail}" style="color: #1A4BFF;">${cleanEmail}</a>)</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #76746E; font-weight: 600;">INTENT:</td>
      <td style="padding: 8px 0; color: #0D0D0E;"><strong>${cleanIntent}</strong></td>
    </tr>
    ${
      cleanOrg
        ? `<tr>
      <td style="padding: 8px 0; color: #76746E; font-weight: 600;">ORGANIZATION:</td>
      <td style="padding: 8px 0; color: #0D0D0E;">${cleanOrg}</td>
    </tr>`
        : ""
    }
    <tr>
      <td style="padding: 8px 0; color: #76746E; font-weight: 600;">RECORD ID:</td>
      <td style="padding: 8px 0; font-family: monospace; font-size: 11px; color: #76746E;">${docId}</td>
    </tr>
  </table>

  <div style="background-color: #FFFFFF; border: 1px solid #D8D4CC; padding: 16px; margin-bottom: 20px;">
    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #76746E; margin-bottom: 8px; font-weight: 600;">DISPATCH MESSAGE:</div>
    <div style="font-size: 14px; line-height: 1.6; color: #0D0D0E; white-space: pre-wrap;">${cleanMessage.replace(
      /</g,
      "&lt;"
    )}</div>
  </div>

  <div style="font-size: 11px; color: #76746E; border-top: 1px solid #D8D4CC; padding-top: 12px;">
    Hit <strong>Reply</strong> to respond directly to ${cleanName} (${cleanEmail}).
  </div>
</div>
        `,
      });

      if (sendResult.error) {
        console.error(`[Contact API] Resend returned an error:`, sendResult.error.message);
        emailSent = false;
      } else {
        emailSent = true;
      }
    } catch (resendErr: unknown) {
      const resendMsg = resendErr instanceof Error ? resendErr.message : "Email error";
      console.error(`[Contact API] Resend delivery exception: ${resendMsg}`);
      emailSent = false;
    }

    // 8. Update Firestore record with delivery result
    try {
      await db.collection("contact_submissions").doc(docId).update({
        emailDeliveryStatus: emailSent ? "delivered" : "notification_failed",
        updatedAt: new Date().toISOString(),
      });
    } catch (updateErr: unknown) {
      console.warn(`[Contact API] Failed to update delivery status in Firestore:`, updateErr);
    }

    // 9. Respond truth-tellingly
    if (!emailSent) {
      // Per instructions: If Firestore succeeds but Resend fails, preserve enquiry and report
      // that it was received but notification delivery failed.
      return NextResponse.json({
        success: true,
        savedToDatabase: true,
        emailNotificationSent: false,
        submissionId: docId,
        message:
          "Your dispatch was safely recorded in our database. However, the automated email notification encountered a temporary delay. Nishanth checks submissions directly.",
      });
    }

    return NextResponse.json({
      success: true,
      savedToDatabase: true,
      emailNotificationSent: true,
      submissionId: docId,
      message: "Your dispatch has been successfully transmitted and recorded.",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    console.error(`[Contact API] Uncaught internal error: ${errorMsg}`);
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected server error occurred while processing your dispatch. Please contact Nishanth directly at adepunishanth1@gmail.com.",
      },
      { status: 500 }
    );
  }
}
