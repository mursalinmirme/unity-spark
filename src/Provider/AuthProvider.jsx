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
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(0);
  const axiosPublic = useAxiosPublic();

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
      // console.log(user);
      setLoading(false);
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      if (currentUser?.email) {
        axiosPublic
          .post("/jwt", loggedUser)
          .then((res) => {
            if (res?.data?.token) {
              localStorage.setItem("Token", res?.data?.token);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        localStorage.removeItem("Token");
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, [user, axiosPublic]);

  const authInfo = {
    user,
    loading,
    newUserCreate,
    userUpdateProfile,
    userSignIn,
    loginOut,
    googleLoginSystem,
    profileComplete,
    setProfileComplete,
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
