import {useContext}  from "react";
import {BlogContext} from "../context/blogContext.jsx";




export const useBlogContext = () =>{
    const context = useContext(BlogContext);

    if (!context) throw new Error("useBlogContext must be used within useBlogContext");

    return context;
}

