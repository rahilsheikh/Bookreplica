const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const data=new mongoose.Schema({

    Uid:{type:String},
    mobile:{type:Number},
    Pass:{type:String},

    name:{type:String},
    email:{type:String},
    message:{type:String}


});
data.pre('save',async function(next){
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password,12)
    }
    next();
})
const Data=new mongoose.model("Data",data);
module.exports=Data;