require("./config.js")
const express =require("express");
const cors=require("cors");
const multer  = require('multer')
const cloudinary=require("./cloudinary.js")
const fs=require ("fs")


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return  cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   const upload = multer({ storage: storage })

app.post("/",upload.single("myfile"),async(req,res)=>{
    try{
        const {url,secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:"Images"
        })

        //deleting file after uploading to cloudinary server
        fs.unlinkSync(req.file.path)

        res.status(200).json({
            message: "Success",
            data:{
                url
            }
        })

    }catch(e){
        console.log(e.message)
        res.status(500).json({
            message:"Error"
        })
    }

})

app.listen(8000,()=>{
    console.log("listening on port 8000")
})