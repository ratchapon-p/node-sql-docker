import express from "express";

const postRoutes = express.Router()

postRoutes.get('/find/:userId')

export default postRoutes