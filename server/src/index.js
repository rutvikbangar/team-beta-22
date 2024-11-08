import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: "./.env"
}) 

const port = process.env.PORT || 8000;
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log("MongoDB connected Successfully",port);
    })
}).catch((err)=>{
    console.log("AN ERROR OCURRED WHILE CONNECTING MONGO",err);
})


console.log("file connect")

