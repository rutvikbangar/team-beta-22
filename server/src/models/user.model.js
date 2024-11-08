import mongoose,{Schema} from "mongoose"
import  bcrypt  from "bcrypt";
import  jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname : {type: String,required:true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: {type: String},
    profilepicture : {type: String},
    coins: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    myaward : [{type:mongoose.Schema.Types.ObjectId, ref: 'Award'}],
    goals : [{type: mongoose.Schema.Types.ObjectId, ref: 'Goal'}],
    pet: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Pet'
    },
    petaward: [{type: mongoose.Schema.Types.ObjectId , ref: 'Award'}]

  },{timestamps:true});

userSchema.pre("save",async function (next){
    if(!this.isModified("password"))return  next();
    this.password=await bcrypt.hash(this.password,10)   
    next()
})
userSchema.methods.isPasswordCorrect=async  function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateReFreshToken=function(){
    return  jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}



export const User=mongoose.model("User",userSchema)