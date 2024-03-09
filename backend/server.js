import express from "express";
import User from './routes/userRoutes.js'
import Blog from './routes/blogRoutes.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'


dotenv.config()

const app = express();

app.use(cors())


app.use(express.json())


app.use('/api/users' , User)
app.use('/api/user' , Blog)











// DB CONNECTION
mongoose.connect(process.env.MONGODB_URI)
    .then(() =>app.listen(process.env.PORT ,()=> console.log(`Server connected to the database and running on port ${process.env.PORT}`)))
    .catch((err) => console.log(`error : ${err.message}`))



