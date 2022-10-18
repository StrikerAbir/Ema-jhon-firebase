import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import app from '../firebase/firebase.init';
export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {

    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
      return  createUserWithEmailAndPassword(auth,email,password);
    }

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const userSignout = ()=>{
        return signOut(auth);
    }

    useEffect(() => {
       const unsubscribe= onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser)
       })
        return ()=> unsubscribe()
    },[])

    const authInfo = {user,createUser,userLogin,userSignout};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;