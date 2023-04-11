import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC2ZqM_qiuh5vUHx4-Ik6xSIyBJdHjN3Mc",
    authDomain: "disneyclone-a9d52.firebaseapp.com",
    projectId: "disneyclone-a9d52",
    storageBucket: "disneyclone-a9d52.appspot.com",
    messagingSenderId: "74097200874",
    appId: "1:74097200874:web:e27137caf86ea5a7f81193",
    measurementId: "G-YE8D8WM3B7"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;