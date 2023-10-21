const mongoose=require("mongoose");
const dotenv=require("dotenv")

dotenv.config({path:"./config.env"})
const db=process.env.db;

mongoose.connect(db,{

    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connection done"))
.catch((e)=>console.log("connection not done",e));

