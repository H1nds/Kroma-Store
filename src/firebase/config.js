// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBcKTm74yAvXM0JCQE0XaP1mMRYErAdu7E",
    authDomain: "kroma-store-web.firebaseapp.com",
    projectId: "kroma-store-web",
    storageBucket: "kroma-store-web.firebasestorage.app",
    messagingSenderId: "681479983412",
    appId: "1:681479983412:web:33118a307f4a8b9d59d561"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); // Base de datos (para los productos)
export const auth = getAuth(app);    // Autenticación (para login)
export const storage = getStorage(app); // Almacenamiento (para subir fotos)
export const googleProvider = new GoogleAuthProvider(); // Para login con Google