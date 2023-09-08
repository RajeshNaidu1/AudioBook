const express=require('express')
const routes=express.Router();
const Detail=require('../models/Detail')
const Slider=require('../models/Slider')
const Service=require('../models/Service')
const Contact=require('../models/Contact')

routes.get("/", async (req, res)=>{
    const details=await Detail.findOne({"_id":"64dfdcbfeb4c62ce85c8b352"})
    const sliders=await Slider.find()
    const services=await Service.find()
    console.log(services)
    res.render('index',{details:details, sliders:sliders, services:services})
})

routes.get("/books", async (req, res)=>{
    const details= await Detail.findOne({"_id":"64dfdcbfeb4c62ce85c8b352"})
    res.render('books',{details:details})
})

routes.get("/home", async (req, res)=>{
    const details=await Detail.findOne({"_id":"64dfdcbfeb4c62ce85c8b352"})
    const sliders=await Slider.find()
    const services=await Service.find()
    console.log(services)
    res.render('index',{details:details, sliders:sliders, services:services})
})


routes.post("/process-contact-form", async (request, response)=>{
    console.log("Form Submitted")
    console.log(request.body)
    // saving in database
    try {
        const data= await Contact.create(request.body)
        console.log(data)
        response.redirect("/")
    } catch (error) {
        console.log(error);
        response.redirect("/")
    }
})

module.exports=routes