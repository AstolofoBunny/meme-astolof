import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";

// Check if Firebase configuration is available
const isFirebaseConfigured = !!(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_APP_ID
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
};

let auth: any = null;
let provider: GoogleAuthProvider | null = null;

// Only initialize Firebase if configuration is available
if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    provider = new GoogleAuthProvider();
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
  }
}

export const signInWithGoogle = () => {
  if (!isFirebaseConfigured || !auth || !provider) {
    throw new Error("Firebase authentication is not configured. Please configure Firebase environment variables.");
  }
  return signInWithPopup(auth, provider);
};

export const logOut = () => {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("Firebase authentication is not configured.");
  }
  return signOut(auth);
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!isFirebaseConfigured || !auth) {
    // Call callback with null user if Firebase is not configured
    callback(null);
    return () => {}; // Return empty unsubscribe function
  }
  return onAuthStateChanged(auth, callback);
};

export { isFirebaseConfigured };