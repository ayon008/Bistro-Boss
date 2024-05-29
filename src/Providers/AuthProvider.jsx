import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.init";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();

    const googleLogin = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    const authInfo = {
        signUp,
        signIn,
        logOut,
        googleLogin,
        updateUserProfile,
        loader,
        user,
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
                axiosPublic.post('userToken', { email: currentUser.email })
                    .then(response => {
                        const token = response.data.token;
                        console.log(token);
                        sessionStorage.setItem('userToken', token);
                        setLoader(false)
                    })
            }
            else {
                setUser(null)
                setLoader(false)
                sessionStorage.removeItem('userToken')
            }
        })
        return () => {
            return unSubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;