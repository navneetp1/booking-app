import express, {Request, Response} from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import verifyToken from '../middleware/auth';

const router = express.Router();

//creating an access token and register cookie like in users.ts
router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 or more characters long!").isLength({min: 6})
], 
    async(req:Request, res: Response) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()})
        }

        const { email, password } = req.body;

        try{

            const user = await User.findOne({ email })
            if(!user){
                return res.status(400).json({ message: "Invalid Credentials"} );
            }

            //checking encrypted passwords..
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({ message: "Invalid Credentials"} );
            }

            //creating an access token and making it an http cookie
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET_KEY as string, {
                    expiresIn: "1d"
            });
            
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000,
             
            });

            res.status(200).json({userId: user._id});


        }catch(error){
            console.log(error);
            res.status(500).json({message: "Something went wrong!"});
        }
    });

    //verifyToken is a middleware that checks for the validity of the authtoken to authorise signins.. created in middleware/auth.ts
router.get("/validate-token", verifyToken, (req: Request, res: Response) =>{
        res.status(200).send({ userId: req.userId });
    });


router.post('/logout', async (req: Request, res: Response)=>{
    //making the token invalid after logout 
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });

    res.send();
});


export default router;