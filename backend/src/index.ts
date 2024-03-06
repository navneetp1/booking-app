import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import authRoutes from './routes/auth'
import userRoutes from './routes/users';
import myHotelRoutes from './routes/my-hotels';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary} from "cloudinary";

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


//connecting to database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

//this tests the working of dotenv (npm run dev - development && npm run e2e - for testing)
/*.then(()=> {
    console.log("Connected to database",
                process.env.MONGODB_CONNECTION_STRING
                )
})*/

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelRoutes);

//letting react handle the routing to access anything that doesnt involve above api routes
//(might fix the access of my-hotel routes without logging in)
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
})

app.get("/api/test", async(req: Request, res: Response) => {
    res.json({message: "Response from express server endpoint"})
});

app.listen(7000, ()=>{
    console.log("server is running!")
})