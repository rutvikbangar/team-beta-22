import mongoose from "mongoose";


const petSchema = new mongoose.Schema({
    name : {type: String, required: true},
    peturl : {type: String,required:true},
    level : {type: Number , default:1 , max:5}
});


export const Pet = mongoose.model("Pet",petSchema);
