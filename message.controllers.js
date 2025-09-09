import express from 'express';
const Router = express.Router();
import Usermodel from '../models/user.model.js';
import messageModel from '../models/message.model.js';


export const getUserforSlidebar = async (req, res) => {
    try {
        const logedinUser = req.user._id;
        const filteruser = await Usermodel.find({ id: { $ne: logedinUser } }).select('-password');
        res.status(200).json(filteruser);
    } catch (error) {
        console.log("err in getUserforSlidebar", error.message);
        res.status(500).json({ message: "err in getUserforSlidebar", error: error.message });
    }
};

export const getmessage = async (req, res) => {

    const { id: UsertochatId } = req.params;   // URL ke params se "id" nikal raha hai aur usko UsertochatId naam de raha hai
    const myid = req.user._id;                 // Current logged-in user ka id (req.user se mil raha hai)

    try {
        // Database se saare messages nikal raha hai jisme dono users ka conversation hai
        const newMessage = await MessageModel.find({
            $or: [   // $or ka matlab: agar condition A ya condition B true ho to data le aao
                { senderId: myid, recieverId: UsertochatId },     // Main user ne usko message bheja
                { senderId: UsertochatId, recieverId: myid }      // Dusre user ne main user ko message bheja
            ]
        });

        res.status(201).json(newMessage);  // Saare messages JSON form me response me bhej raha hai
    } catch (error) {
        console.log("err in getmessage", error.message);
        res.status(500).json({ message: "err in getmessage", error: error.message });
    }
};

export const sendmessage = async (req, res) => {
    
    
    try {
        const { id: recieverId } = req.params;
        const myid = req.user._id;
        const { text , image } = req.body;
      let imageUrl;
      if(image) {   
          const imageUpload = await cloudinary.uploader.upload(image);
           imageUrl = imageUpload.secure_url;
      }
        const newMessage = await messageModel.create({
            senderId: myid,
            recieverId: recieverId,
            text,
            image: imageUrl
        });

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("err in sendmessage", error.message);
        res.status(500).json({ message: "err in sendmessage", error: error.message });
    }
};
