import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';

const router = express.Router();

//stores images that we get from post request into the memory
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    },
});

//api/my-hotels    ------ imageFiles - form property, 6 - max no of images
router.post('/', 
        verifyToken,  
        [
            body("name").notEmpty().withMessage("Name is required"),
            body("city").notEmpty().withMessage("City is required"),
            body("country").notEmpty().withMessage("Country is required"),
            body("description").notEmpty().withMessage("Description is required"),
            body("type").notEmpty().withMessage("Hotel Type is required"),
            body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
            body("facilities").notEmpty().isArray().withMessage("Facilities are required "),

        ],
        upload.array("imageFiles", 6),  
        async (req: Request, res: Response) => {
    try{
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
        

        //upload images to cloudinary
        const uploadPromises = imageFiles.map(async(image) => {
            //encoding the image as a base64 string 
            const b64 = Buffer.from(image.buffer).toString("base64");

            //the actual string of the image
            let dataURI = "data:" + image.mimetype + ";base64," + b64;

            //using cloudinary sdk to upload the image to cloudinary
            const res = await cloudinary.v2.uploader.upload(dataURI); 

            return res.url; 
        });
        
        //by this, we're letting all the images to be uploaded first before the image url is generated...
        const imageUrls = await Promise.all(uploadPromises);
        
        //add urls to hotel object if upload successful
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        
        //save hotel in our database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        //return a 201 status 
        res.status(201).send(hotel);

    }catch(error){
        console.log("Error creating hotel: ", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

//for viewing/getting  hotels, a new route created
router.get('/', verifyToken, async(req: Request, res: Response)=> {


    try{

        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels);

    }catch(e){
        res.status(500).json({ message: "Error fetching hotels.."})
    }
})

export default router;