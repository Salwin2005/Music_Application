import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthUserContext } from './AuthContextApi';
import { doc, onSnapshot } from 'firebase/firestore';
import { __DB } from '../Backend/firebaseconfig';

export let BackendUserContext = createContext(null);

const FetchUserContext = ({children}) => {
    let {authUser} = useContext(AuthUserContext);
    let uid = authUser?.uid;

    let [userData, setUserData] = useState(null || {});
    let [role, setRole] = useState("")

    useEffect(() => {
       let fetchProfile = () => {
        if(!uid) {
            return;
        }
        //onsnapshot() -> event listener
        let user_data_reference = doc(__DB, "user_details", uid);
        onSnapshot(user_data_reference, (userinfo) => {
            console.log(userinfo);
            if(userinfo.exists()){
                setUserData(userinfo?.data());
                
            } 
            else{
                console.log("profile data not found");
                
            }           
        });
        
       }
       fetchProfile();

    },[uid]) // [uid] is a dependency array, It will fetch the data when uid is present
  return (
    <BackendUserContext.Provider value={{userData}}>
        {children}
    </BackendUserContext.Provider>
  )
}

export default FetchUserContext