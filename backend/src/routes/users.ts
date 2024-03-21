import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import { check, validationResult } from 'express-validator'
import verifyToken from '../middleware/auth';

const router = express.Router()

router.get("/me", verifyToken, async( req: Request, res: Response) => {
    const userId = req.userId;

    try{
        const user = await User.findById(userId).select("-password") //excludes the password
        if(!user){
            return res.status(400).json({ message: "User not found"});
        }

        res.json(user);
        
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Something went wrong"})
    }
})

router.post("/register", [
    //middleware that checks for errors in the fields
    check("email", "Email is required!").isEmail(),
    check("password", "Password must be 6 or more characters long!").isLength({ min: 6 }),
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString()

], async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()}) //1:16:19
    }

    try{
        //check if user exists
        let user = await User.findOne({
            email: req.body.email,

        });

        // if the user already exists, then display message
        if(user){
            return res.status(400).json({message: "User already exists!"})
        }

        //if new user, then use info from form body to create new user
        user = new User(req.body);
        await user.save()

        //token creation process
        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string, {
                expiresIn: "1d"
        });

        res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000,
        });

        return res.status(200).send({message: "User registered OK!"});


    } catch(error){
        console.log(error)
        res.status(500).send({message: "Something went wrong!"})
    }
})

export default router;