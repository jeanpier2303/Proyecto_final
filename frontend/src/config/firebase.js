/* // config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "frutos-del-pacifico.firebaseapp.com",
  projectId: "frutos-del-pacifico",
  storageBucket: "frutos-del-pacifico.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; */