import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- FUNCIONES DE AUTENTICACIÓN ---

    // 1. Registro con Email
    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    // 2. Login con Email
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    // 3. Login con Google
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    // 4. Cerrar Sesión
    const logout = () => signOut(auth);

    // 5. Escuchar cambios de sesión (Mantiene al usuario logueado al recargar)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, loginWithGoogle, loading }}>
            {children}
        </AuthContext.Provider>
    );
};