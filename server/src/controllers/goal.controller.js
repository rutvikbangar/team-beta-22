import mongoose from "mongoose";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Goal } from "../models/goal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createGoal = asyncHandler(async (req,res)=>{
 const {title , description} = req.body ;



 if (!Array.isArray(description) || !description.every(item => typeof item === 'string')) {
     return res.status(400).json({ message: "Description must be an array of strings." });
 }

 const tasks = description.map(desc => ({
     taskId: new mongoose.Types.ObjectId(),
     description: desc,
     taskcoin: 100,
     completed: false,
 }));


 const creategoal = await Goal.create({
    title:title,
    tasks:tasks,
    createdBy : req.user?._id,
 });
 
 const iscreate = await Goal.findById(createGoal._id);

 if(!iscreate){
    throw new ApiError(400,"Sorry goal is not created")
 }

 return res.status(200).json(new ApiResponse(200,iscreate,"Goal created Successfully"));

})



export {createGoal}


