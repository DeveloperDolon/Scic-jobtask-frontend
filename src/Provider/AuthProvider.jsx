import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase.config";
import axios from "axios";


export const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const mainUrl = "http://localhost:5000";
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if(currentUser) {
               setUser(currentUser);
               setLoading(false)
               axios.post(`${mainUrl}/jwt`, {user: currentUser?.email}, 
                {withCredentials: true}
                ).then(res => console.log(res.data))
                .catch(err => console.log(err))
            } else {
                setLoading(false)
            }
        })

        return () => {
            unSubscribe();
        }
    }, [])

    const contextValues = {
        user,
        loading,
        createUser,
        loginWithEmailAndPassword,
        googleLogin,
        logOut,
        setUser,
        mainUrl
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}