import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



import userRouter from "./routes/user.routes.js"
import goalRouter from "./routes/goal.routes.js"
import awardRouter from "./routes/award.routes.js"




app.use("/api/v1/users/goals",goalRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin/award",awardRouter)


export {app}




