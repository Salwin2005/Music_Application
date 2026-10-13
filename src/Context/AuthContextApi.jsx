import { onAuthStateChanged, signOut,  } from 'firebase/auth';
import React, {children , createContext, useEffect, useState } from 'react'
import { __AUTH } from '../Backend/firebaseconfig';
import toast from 'react-hot-toast';

//Create context for the user

export let AuthUserContext = createContext(null);

const AuthContextApi = ({children}) => {
    
    let [authUser, setAuthUser] = useState(null || {});

    useEffect(() => {
        onAuthStateChanged(
            __AUTH , 
            (userInfo) => {
                if(userInfo?.emailVerified == true){
                    window.localStorage.setItem("UserToken",userInfo?.accessToken)
                    setAuthUser(userInfo)
                }else{
                    setAuthUser(null)
                    window.localStorage.removeItem("UserToken")
                }
            })
    },[])

    let logout = async () => {
        try{
            await signOut(__AUTH);
            window.localStorage.removeItem("UserToken");
            toast.success("Logout Sucessfull");
            setTimeout(() => {
                window.location.assign("/")
            },1000)
        }catch{
            toast.error(error.message)
        }
    }

  return <AuthUserContext.Provider value={{authUser,logout}}>
    {children}
  </AuthUserContext.Provider>
  
}

export default AuthContextApi