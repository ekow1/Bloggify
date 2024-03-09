import {useContext} from "react";
import {AuthContext} from "../context/authContext.jsx";

// custom hook to consume the context
export const useAuthContext = () => {
    const context  = useContext(AuthContext);

    if (!context){
        throw new Error("useAuthContext must be used within useAuthContext");


    }

    return context;
}