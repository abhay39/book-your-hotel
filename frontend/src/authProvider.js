import { createContext, useState } from "react";

export const AuthenicationProvider=createContext();

const Auth=({children})=>{
    const [userState,setUserState]=useState(false);
    const [userData,setUserData]=useState('');
    const [userStatus,setUserStatus]=useState('unauthenticated')
    const BACKEND_URL='http://localhost:5000';

    return(
        <AuthenicationProvider.Provider value={{userData,userState,setUserData,setUserState,userStatus,setUserStatus,BACKEND_URL}}>
            {children}
        </AuthenicationProvider.Provider>
    )
}

export default Auth;