const express=require("express")
const cors=require("cors")
const router=require("./Router/Route")
const app=express();

const dotenv=require("dotenv")

app.use(express.json())
app.use(cors())
app.use(router);

dotenv.config({path:"./config.env"})
const port=process.env.port;

app.listen(port,()=>{
    console.log("connection done with server 9000")
});