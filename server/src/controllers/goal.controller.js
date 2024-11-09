import mongoose from "mongoose";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Goal } from "../models/goal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


const createGoal = asyncHandler(async (req,res)=>{
 const {title , description} = req.body ;

 if (!Array.isArray(description) || !description.every(item => typeof item === 'string')) {
     return res.status(400).json({ message: "Description must be an array of strings." });
 }

 const tasks = description.map(desc => ({
     description: desc,
     taskcoin: 100,
     completed: false,
 }));


 const creategoal = await Goal.create({
    title:title,
    tasks:tasks,
    createdBy : req.user?._id,
 });
 
 const iscreate = await Goal.findById(creategoal._id);

 if(!iscreate){
    throw new ApiError(400,"Sorry goal is not created")
 }

 return res.status(200).json(new ApiResponse(200,iscreate,"Goal created Successfully"));

});


const completeTask = asyncHandler(async (req, res) => {
    const { goalId, taskId } = req.params;

 
    if (!mongoose.Types.ObjectId.isValid(goalId) || !mongoose.Types.ObjectId.isValid(taskId)) {
        throw new ApiError(400, "Invalid request Id");
    }

    const goal = await Goal.findById(goalId);
    if (!goal) {
        return res.status(404).json({ message: "Goal not found." });
    }

    if (goal.isExpired) {
        return res.status(400).json({ message: "Goal deadline has passed. Cannot complete tasks in an expired goal." });
    }

    const task = goal.tasks.id(taskId);
    if (!task || task.completed) {
        return res.status(404).json({ message: "Task not found or already completed." });
    }


    task.completed = true;


    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        { $inc: { coins: 100 } },
        { new: true } // Return the updated user document
    );

   
    const totalTasks = goal.tasks.length;
    const completedTasks = goal.tasks.filter(task => task.completed).length;
    const completionStatus = totalTasks > 0 ? completedTasks / totalTasks : 0;
    goal.status = completionStatus;

   
    await goal.save();

    
    res.status(200).json(new ApiResponse(200, { goal, coins: updatedUser.coins }, "Task completed"));
});


const deleteGoal = asyncHandler(async (req,res) => {
    const { goalId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(goalId)) {
        throw new ApiError(400, "Invalid goal Id");
    }

 
    const goal = await Goal.findById(goalId);
    if (!goal) {
        return res.status(404).json({ message: "Goal not found." });
    }

    
    if (goal.isExpired) {
        return res.status(400).json({ message: "Goal deadline has passed." });
    }
    await Goal.findByIdAndDelete(goal._id);

    return res.status(200).json(new ApiResponse(200,{},"Goal deleted"));

});

const goalHistory = asyncHandler(async (req,res) => {
    const curruser = req.user?._id ;
    const allGoals = await Goal.find({ createdBy: curruser._id });
    
    if(!allGoals){
        throw new ApiError(400,"all goals not fetched")
    }

    return res.status(200).json(new ApiResponse(200,allGoals,"all Goals fetched"));
});

const getactiveGoal = asyncHandler(async (req,res) => {
    const curruser = req.user?._id ;
    const allGoals = await Goal.find({createdBy: curruser});
    const activeGoalsNotExpired = allGoals.filter(goal => !goal.isExpired);
    res.status(200).json(new ApiResponse(200,activeGoalsNotExpired,"Active goals fetched"));
})



export {createGoal,completeTask,deleteGoal,goalHistory,getactiveGoal}


