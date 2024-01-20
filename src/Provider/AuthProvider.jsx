import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create New User
  const newUserCreate = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // User Profile Update

  const userUpdateProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // singOut
  const loginOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // user login
  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login System
  const googleLoginSystem = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // On Auth State

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(user);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [user]);

  const authInfo = {
    user,
    loading,
    newUserCreate,
    userUpdateProfile,
    userSignIn,
    loginOut,
    googleLoginSystem,
  };

  useEffect(() => {
    if (user) {
      return setLoading(false);
    }
  }, [user]);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
