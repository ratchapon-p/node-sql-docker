import express from "express";
import { getUser } from "../controllers/user.js";

const userRoutes = express.Router()

userRoutes.get('/find/:userId', getUser)

export default userRoutes