import jwt from "jsonwebtoken"
import User from "../model/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// create jsonwebtoken

const createToken = (_id) => {
    return jwt.sign({ _id }, jwtSecret, { expiresIn: '3d' });
}



export const register = async (req , res) => {

    try{

    // taking user info from form
    const {full_name , username , email , password} = req.body;

    // creating the user in data using the signup method from the user model
    const  user = await User.signup(full_name, username, email, password);

    // creating the user token
    const token = createToken(user._id);

    // user info response in json format
        res.status(201).json({username , email , token });
    } catch (e) {
        res.status(401).json({error: e.message});
    }


}


export const login = async (req , res) => {
    // user info from  form
    const {email, password} = req.body;
    try {
        // authenticating user with the login method from the user  model
        const user = await User.login(email, password);

      // user token
        const token = createToken(user._id);

        // reponse info
        res.status(201).json({email, token});

    } catch (e) {

        res.status(401).json({error: e.message});
        return


    }



}
