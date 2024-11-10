import mongoose  from "mongoose";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Award } from '../models/award.model.js';
import { Pet } from "../models/pet.model.js";

const generateAccessTokenAndRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateReFreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        
        return{accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"something went wrong while generating access token and refresh token")
    }
}

const registerUser=asyncHandler(async(req,res)=>{
    //register user here
    const {fullname, email, username, password } = req.body
 

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
  

    let profileLocalPath;
    
    profileLocalPath =  req.file?.path ;
    
    

   
    const uploadprofile = await uploadOnCloudinary(profileLocalPath)

    if(!uploadprofile){
        throw new ApiError(400,"image not uploaded");
    }
   

    const user = await User.create({
        fullname,
        profilepicture: uploadprofile?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
});

const loginUser = asyncHandler(async (req,res) => {
   

    const {email, password} = req.body
   

    if (!email) {
        throw new ApiError(400, "email is required")
    }
    
   

    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    return res
    .status(200)
    
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
});

const logoutUser = asyncHandler(async (req, res) => {
    try {

        await User.findByIdAndUpdate(
            req.user._id, 
            {
                $unset: {
                    refreshToken: 1 
                }
            },
            { new: true }
        );

        return res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Logout failed" });
    }
});


const displayUserAward = asyncHandler(async (req,res) => {
    const curruser = req.user._id ;
    const user = await User.findById(curruser).populate("myaward");
    if (!user) {
       throw new ApiError(400,"User not found in display Award");
    }

    res.status(200).json({
        message: 'User awards fetched successfully',
        awards: user.myaward
    });
});

const displaynotBuyedAward = asyncHandler(async (req, res) => {
    const curruser = req.user._id; 
    const user = await User.findById(curruser).populate('myaward');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const allAwards = await Award.find();

    const notBoughtAwards = allAwards.filter(award => !user.myaward.some(userAward => userAward._id.equals(award._id)));

    res.status(200).json({
        message: 'Awards not bought yet fetched successfully',
        notBoughtAwards
    });
});

const buyAward = asyncHandler(async (req, res) => {
    const { awardId } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(awardId)) {
        throw new ApiError(400, "Invalid Award Id");
    }

   
    const award = await Award.findById(awardId);
    if (!award) {
        throw new ApiError(404, "Award not found");
    }

    
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    
    const price = award.reqcoin;
    const balance = user.coins;
    if (price > balance) {
        return res.status(400).json({message:"Insufficient balance"});
    }

    
    let upuser;
    if (award.recipient === "user") {
        upuser = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $push: { myaward: awardId },
                $inc: { coins: -price } 
            },
            { new: true }
        );
    } else if (award.recipient === "pet") {
        upuser = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $push: { petaward: awardId }, 
                $inc: { coins: -price } 
            },
            { new: true }
        );
    } else {
        throw new ApiError(400, "Invalid recipient type");
    }

    if (!upuser) {
        throw new ApiError(400, "Failed to update user or pet awards");
    }

    return res.status(200).json({
        coins: upuser.coins,
        message: "Award redeemed successfully"
    });
});

const getcurrentUser  = asyncHandler(async (req,res) => {
    const curruser = req.user?._id ;
    const user = await User.findById(curruser);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    return res.status(200).json(new ApiResponse(200,user,"User Fetched"));
})

const displayPetaward = asyncHandler(async (req, res) => {
    const curruser = req.user._id;

    
    const user = await User.findById(curruser).populate('petaward');
    

    if (!user) {
        throw new ApiError(404, "User not found while displaying pet"); 
    }

  
    res.status(200).json({
        message: 'Pet awards fetched successfully',
        awards: user.petaward
    });
});


const assignPet = asyncHandler(async (req, res) => {
    const { petId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(petId)) {
        throw new ApiError(400, "Invalid Pet Id");
    }
    
    const curruser = req.user?._id;
    let updateuser = await User.findByIdAndUpdate(
        curruser,
        { $set: { pet: petId } },
        { new: true }
    );

    if (!updateuser) {
        throw new ApiError(400, "Failed to update the user pet");
    }

    updateuser = await updateuser.populate("pet");
    return res.status(200).json({ message: "Pet Assigned", pet: updateuser.pet });
});



export {registerUser,loginUser,logoutUser,displayUserAward,displaynotBuyedAward,buyAward,displayPetaward,assignPet,getcurrentUser}
