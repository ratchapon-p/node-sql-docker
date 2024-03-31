import express from "express";

const likeRoutes = express.Router()

likeRoutes.get('/find/:userId')

export default likeRoutes