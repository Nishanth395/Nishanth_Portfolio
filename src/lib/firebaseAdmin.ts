import "server-only";
import { initializeApp, getApps, getApp, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let app: App;
let db: Firestore;

/**
 * Initializes and returns a singleton instance of Firebase Admin and Firestore.
 * Strictly server-only. Throws a descriptive error if environment variables are missing.
 */
export function getFirebaseAdmin(): { app: App; db: Firestore } {
  if (getApps().length > 0) {
    app = getApp();
    db = getFirestore(app);
    return { app, db };
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    const missing = [
      !projectId && "FIREBASE_PROJECT_ID",
      !clientEmail && "FIREBASE_CLIENT_EMAIL",
      !privateKey && "FIREBASE_PRIVATE_KEY",
    ].filter(Boolean);

    throw new Error(
      `Firebase Admin configuration missing required environment variable(s): ${missing.join(", ")}`
    );
  }

  // Support secure private key newline formatting from environment variables
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  // Remove surrounding quotes if accidentally included in env configuration
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  try {
    app = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
    db = getFirestore(app);
    return { app, db };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    throw new Error(`Failed to initialize Firebase Admin SDK: ${message}`);
  }
}

/**
 * Convenience accessor for Firestore database instance.
 */
export function getFirestoreDb(): Firestore {
  const { db } = getFirebaseAdmin();
  return db;
}
