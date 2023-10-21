const express=require("express")
const Data=require("../Modal/data")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const route=express.Router();
require("../DB/cont");

const fun=(req,res,next)=>{
    console.log("welcome...");
    next();
}
route.get("/",(req,res)=>{
    res.send("Home page");
})
route.post("/newDocument",async (req,res)=>{
    try{
        const {Uid,mobile,Pass,name,email,message}=req.body;
        let employee=new Data({Uid,mobile,Pass,name,email,message})
        await employee.save();
        res.send("employee joined")
    }
    catch(e){
        console.log(e)
    }
})


route.post("/login",async (req,res)=>{
    try{
        const {Uid,pass}=req.body;
        const user=await Data.findOne({Uid});
        if((await bcrypt.compare(pass,user.pass))){
            const token=jwt.sign(
                { user_id:user._id,Uid},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"2h",
                }
            )
            user.token=token;
            res.send(user);
        }
        else{
            res.send("Invalid");
        }
    }
    catch(err){
        console.log(err);
    }
});

route.get("/getInfo",fun,async(req,res)=>{
    try{
        let data=await Data.find();
        res.send(data);
    }
    catch(e){
        console.log(e);
    }
})

route.get("/searchDocument/:Uid",async(req,res)=>{
    try{
        let {Uid}=req.params;
        let data=await Data.find({Uid})
        res.send(data);
    }
    catch(e){
        console.log(e)
    }
})

route.delete("/removeDocument/:Uid",async(req,res)=>{
    try{
        console.log(req.params);
        const {Uid,name}=req.params;
        const data=await Data.findOneAndDelete({Uid:Uid,name:name});
        res.send("removed");
    }
    catch(e){
        console.log(e);
    }
})

route.put("/UpdatedDocument/:Uid",async(req,res)=>{
    try{
        let {Uid}=req.params;
        await Data.findOneAndUpdate({Uid:Uid},req.body,{new:true})
        res.send("updated...")
    }
    catch(e){
        console.log(e)
    }
})

module.exports=route;