import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import authRoutes from './routes/auth'
import userRoutes from './routes/users';
import cookieParser from 'cookie-parser';
import path from 'path';

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

app.get("/api/test", async(req: Request, res: Response) => {
    res.json({message: "Response from express server endpoint"})
});

app.listen(7000, ()=>{
    console.log("server is running!")
})