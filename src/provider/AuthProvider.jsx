import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import AuthContext from "../context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";



const googleAuthProvider = new GoogleAuthProvider()


const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const  axiosPublic = useAxiosPublic()
  
  const createUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const updateUser = (name, photo)=>{
    setLoading(true)
    return updateProfile(auth.currentUser,{displayName:name, photoURL:photo})
  }

  const signInUser = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  
  const signOutUser = ()=>{
    setLoading(true)
    return signOut(auth)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        const userInfo = {email:currentUser?.email}
        axiosPublic.post("/jwt", userInfo)
        .then(res=>{
          if(res.data?.token){
            localStorage.setItem("token", res.data.token)
            setLoading(false);
          }
        })
      }else{
        localStorage.removeItem("token")
        setLoading(false);
      }
      
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    setUser,
    setLoading,
    createUser,
    updateUser,
    signInUser,
    signOutUser,
    signInWithGoogle
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;