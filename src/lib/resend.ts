import "server-only";
import { Resend } from "resend";

let resendClient: Resend | null = null;

/**
 * Verified routing recipient and test sender addresses.
 * SENDER is currently using onboarding@resend.dev for test routing prior to custom domain verification.
 */
export const CONTACT_RECIPIENT_EMAIL =
  process.env.CONTACT_RECIPIENT_EMAIL || "adepunishanth1@gmail.com";

export const CONTACT_SENDER_EMAIL =
  process.env.CONTACT_SENDER_EMAIL || "onboarding@resend.dev";

/**
 * Returns a singleton Resend client instance.
 * Strictly server-only. Throws if RESEND_API_KEY is absent.
 */
export function getResendClient(): Resend {
  if (resendClient) {
    return resendClient;
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Resend configuration missing required environment variable: RESEND_API_KEY"
    );
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}
