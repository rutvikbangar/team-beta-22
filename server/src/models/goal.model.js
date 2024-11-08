import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    title : {type: String , required : true},
    status : {type: Number,default:0},
    task  : [{
        description: {type: String,required:true},
        taskcoin : 100 ,
        completed: {type:Boolean,default:false},

    }],

    createdBy : {type: mongoose.Schema.Types.ObjectId ,ref: 'User'},
    deadline : {
        type: Date,
        default: function (){
            return new Date(Date.now() + 24*60*60*1000);
        }
    }

},{timestamps:true});

goalSchema.virtual('isExpired').get(function() {
    return new Date() > this.deadline;
});


export const Goal = mongoose.model("Goal",goalSchema) ;

  





