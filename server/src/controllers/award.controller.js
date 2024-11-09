import mongoose from "mongoose";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Award} from "../models/award.model.js"



const createAward = asyncHandler(async (req,res) => {
    const {name,recipient,reqcoin} = req.body;
    if (name === "" || recipient === "" || reqcoin == null || isNaN(reqcoin)) {
        throw new ApiError(400, "All the award fields are required and reqcoin must be a valid number");
    }    
    let awardLocalPath ;
    awardLocalPath = req.file?.path ;
    const awardimg = await uploadOnCloudinary(awardLocalPath);
    if(!awardimg){
        throw new ApiError(400,"award image not uploaded to server");
    }
    const award = await Award.create({
        name : name,
        awardurl : awardimg.url,
        recipient : recipient,
        reqcoin : reqcoin,

    });

    const createdaward = await Award.findById(award._id);
    if(!createdaward){
        throw new ApiError(400,"unable to create a award");
    }

    return res.status(200).json(new ApiResponse(200, createdaward,"awarded created"));

})

export {createAward}



