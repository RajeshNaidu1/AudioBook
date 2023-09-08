const express=require('express')
const hbs=require('hbs')
const mongoose=require('mongoose')
const path=require('path')
const Detail=require('./models/Detail')
const Slider=require('./models/Slider')
const Service=require('./models/Service')
const Contact=require('./models/Contact')
const bodyParser=require('body-parser')
const expressUpload= require('express-fileupload')
const pdfParse=require('pdf-parse')
const pdfJs= require('pdfjs')
const app=express();

const routes=require('./routes/main')
const fileUpload = require('express-fileupload')
app.use('/static',express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use('', routes)
app.use(fileUpload())

//template engine
app.set('view engine', 'hbs')
app.set('views', 'views')
hbs.registerPartials("views/partials")

mongoose.connect("mongodb://0.0.0.0:27017/dynamic_website").then((succ)=>{
    // if(err) console.log(err)
    // Service.create([
    //     {
    //         iconUrl:"/static/img/book.png",
    //         title:"Free Audio Books",
    //         description:"Upload the pdf and listen to the audio book for free",
    //         linkUrl1:"#",
    //         linkUrl2:"#"
    //     },
    //     {
    //         iconUrl:"/static/img/book.png",
    //         title:"Free Audio Books",
    //         description:"Upload the pdf and listen to the audio book for free",
    //         linkUrl1:"#",
    //         linkUrl2:"#"
    //     },
    //     {
    //         iconUrl:"/static/img/book.png",
    //         title:"Free Audio Books",
    //         description:"Upload the pdf and listen to the audio book for free",
    //         linkUrl1:"#",
    //         linkUrl2:"#"
    //     }
    // ])
    // Slider.create([
    //     {
    //         title:"Nature pic1",
    //         subTitle:"This is the nature pic1",
    //         imageUrl:"/static/img/download(2).jpeg"
    //     },
    //     {
    //         title:"Nature pic2",
    //         subTitle:"This is the nature pic2",
    //         imageUrl:"/static/img/download(1).jpeg"
    //     },
    //     {
    //         title:"Nature pic3",
    //         subTitle:"This is the nature pic3",
    //         imageUrl:"/static/img/download.jpeg"
    //     }
    // ])
    // Detail.create({
    //     brandName:"Nature",
    //     brandIconUrl:"/static/img/download.jpeg",
    //     links:[
    //         {
    //         label:"Home",
    //         url:'/home'
    //         },
    //         {
    //             label:"Services",
    //             url:'/services'
    //         },
    //         {
    //             label:"Gallery",
    //             url:'/gallery'
    //         },
    //         {
    //             label:"About",
    //             url:'/about'
    //         },
    //         {
    //             label:"Contact",
    //             url:'/contact'
    //         }
    //     ]
    // })
    console.log("Connected to",succ.connection.host)
}).catch(err=>console.log(err.message))
app.post("/extract-text",(req1, res1)=>{
    if(!req1.files&&!req1.files.pdfFile){
        res1.status(400);
        res1.end();
    }
    pdfParse(req1.files.pdfFile).then(result=>{
        res1.send(result.text);
    })
})

app.listen(5556, ()=>{
    console.log("Server created")
})