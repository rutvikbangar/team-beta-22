import mongoose from "mongoose";

const awardSchema = new mongoose.Schema({
    name : {type: String,required : true},
    awardurl : {type: String,required: true},
    recipient : {type: String, enum :["user","pet"],required:true},
    reqcoin : {type:Number,required : true},
    
},{timestamps:true});



export const Award = mongoose.model("Award",awardSchema);