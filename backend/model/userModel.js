import mongoose  from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';


const {Schema, model} = mongoose;



const userSchema = new Schema({

    full_name: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})



// signup method

userSchema.statics.signup = async function (full_name , username , email , password){

    // ensuring all fields are field
    if (!full_name || !username || !email || !password){
        throw new Error("Missing required fields");
    }

    //validating email address

    if (!validator.isEmail(email)){
        throw new Error("Invalid email address");
    }

    //Checking for strong password

    if (!validator.isStrongPassword(password)){
        throw new Error("Password is not strong")
    }


    //checking for existing username and email address

    const usernameExist = await User.findOne({username : username})
    const emailExist = await User.findOne({email: email})

    if (usernameExist){
        throw new Error(` username  taken`)
    }
    if (emailExist){
        throw new Error(` email  already exist`)
    }


    // encrypting the password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password , salt);


    // user creation
    const user = await this.create ({full_name , username , email , password: hashPassword});

    return user;

}



// login method
userSchema.statics.login = async (email, password) =>{

      // ensuring all fields are field
     if (!email || !password){
         throw new Error("All fields are required")
     }

    //validating email address
    if (!validator.isEmail(email)){
        throw new Error("Invalid email address");
    }

    //checking if email exist
    const user = await User.findOne({email: email});
    if (!user){
        throw new Error("No account is registered with this email address");
    }

    // validating password
    const match = await bcrypt.compare(password , user.password)

    if (!match){
        throw new Error ("Incorrect password")
    }

    return user


}



const User = model("User", userSchema);
export default User;