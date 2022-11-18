import { useContext } from "react";
import { AuthContext, AuthContextTypes } from "../contexts/AuthContext";
import  SignIn  from "../pages/signin";

export const RequireAuth = ({children}: {children: AuthContextTypes}) =>{
    const auth = useContext(AuthContext)

    if(!auth.user){
        return <SignIn/>;
    }
    
    return children

}