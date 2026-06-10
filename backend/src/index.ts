import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"
import {clerkWebhookHandler} from "./webhooks/clerk.js"
dotenv.config()
const app = express()


const rawJson = express.raw({type:"application/json",limit:"1mb"})

app.post("/webhook/clerk",rawJson,(req,res)=>{
    void clerkWebhookHandler(req,res);
})


app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})