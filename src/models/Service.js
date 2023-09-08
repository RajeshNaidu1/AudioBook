const mongoose=require('mongoose');

const Service= mongoose.Schema({
    iconUrl:String,
    title:String,
    description:String,
    linkUrl1:String,
    linkUrl2:String
})

module.exports=mongoose.model("services", Service)