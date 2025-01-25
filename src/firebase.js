import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
let app, analytics, db, auth, googleProvider;

try {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    db = getFirestore(app);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
} catch (error) {
    console.error("Firebase initialization error:", error);
}

export { db, auth, googleProvider };

// Add admin check
export const isAdmin = (user) => {
    const adminEmails = ['rhemmany@gmail.com']; 
    return user && adminEmails.includes(user.email);
  };
  const otherData = {
    title: formData.title,
    content: formData.content,
}
const postData = {
    ...otherData,
    createdAt: Timestamp.now(),
};
const formattedDate = post.createdAt.toDate().toLocaleString();