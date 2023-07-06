import ENV from '@/utils/env';
import { getApps, getApp, initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
export const firebaseConfig:Object = {
    apiKey: ENV.FIREBASE_API_KEY,
    authDomain: ENV.FIREBASE_AUYH_DOMAIN,
    projectId: ENV.FIREBASE_PROJECT_ID,
    storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: ENV.FIREBASE_MESSAGEING_SENDER_ID,
    appId: ENV.FIREBASE_APP_ID
};

export const initializeFirebaseApp = () => {
    return !getApps().length ? initializeApp(firebaseConfig) : getApp()
}