// VAR ENV
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const apiDomain= import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const apiPrjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
//
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: apiDomain,
  projectId: apiPrjectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('___');
      // Actualizar el estado de la aplicación o redirigir al usuario
    })
    .catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
};

export { db, auth, logout }
export default app