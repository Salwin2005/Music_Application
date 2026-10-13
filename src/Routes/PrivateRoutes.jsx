import React, { useContext } from 'react'

import { Navigate } from 'react-router-dom';
import { AuthUserContext } from '../Context/AuthContextApi';


const PrivateRoutes = ({children}) => {
 let {authUser} = useContext(AuthUserContext);
//   ! this is for profile

if(authUser == null){
    return<Navigate to={"/auth/login"}/>;
}else{
       return <>{children}</>
    }
}


export default PrivateRoutes;