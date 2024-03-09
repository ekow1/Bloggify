
  import jwt from "jsonwebtoken";
  import dotenv from "dotenv";
  import User from "../model/userModel.js";

  dotenv.config();

  const requireAuth =  async (req,res,next) =>{

    const {authorization} = req.headers;

    if(!authorization){
        res.status(401).json('authorization token needed');
    }


    const token = authorization.split(' ')[1];

    try{
        const {_id} = jwt.verify(token , process.env.JWT_SECRET);
        req.user = await User.findOne({_id}).select('_id username');
        next()
    }catch (e) {
        res.status(401).json('authorization token invalid');
    }
  }



  export default requireAuth;