import asyncHandler from "express-async-handler";
import { db } from "../dbConnect/dbConnect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = asyncHandler(async (req, res) => {
  //Check user if exists
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Create new user

    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)"

    const values = [req.body.username,req.body.email,hashedPassword,req.body.name]

    db.query(q, [values], (err, data) =>{
        if(err) return res.status(500).json(err)
        return res.status(201).json({message: "User has been created.",data: values})

    })

  });
});


export const login = asyncHandler(async (req, res) => {
    const  q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err,data) =>{
        if(err) return res.status(500).json(err)
        if(data.length === 0) return res.status(404).json("User not found.")

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) res.status(400).json("Wrong username or password")

        const token = jwt.sign({id:data[0].id}, "secretkey")

        const {password, ...others} = data[0]


        res.cookie("accessToken", token,{
            httpOnly: true
        }).status(200).json(others)
        
    })

});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none",

    }).status(200).json("Logout successfully")
});
