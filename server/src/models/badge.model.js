import mongoose from "mongoose";


const badgeSchema = new mongoose.Schema({
    badgename : {type: String , required : true},
    badgeurl : {type: String,required : true},
    // when to give batch

},{timestamps:true})