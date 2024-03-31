import express from "express";
import dotenv from "dotenv";
import dbConnect from "./dbConnect/dbConnect.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors"


dbConnect()

const app = express();
const PORT = process.env.PORT || 9999

dotenv.config()

//middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/likes', likeRoutes)
app.use('/api/v1/comments', commentRoutes)
app.use('/api/v1/auth', authRoutes)


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})