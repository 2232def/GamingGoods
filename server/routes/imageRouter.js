const express = require("express");
const router = express.Router();
const Image = require("../models/image-model");
const upload = require("../middlewares/upload");

router.post("/upload" , upload.single("image"), async function(req, res, ) {
    try{
        if(!req.file){
            return res.status(400).json({success:false, message:"No file uploaded"});
        }

        const newImage = new Image({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            size: req.file.size,
            imageData: req.file.buffer,
        });

        await newImage.save();
        res.json({success:true, message:"File uploaded successfullly", image: newImage});
    } catch(error){
        console.error("upload error", error);
        res.status(500).json({success: false, message:"server error", error:error.message});
    }
})

router.get("/image/:id", async function(req, res){
    try{
        const image = await Image.findById(req.params.id);
        if(!image){
            return res.status(404).json({success: false, message:"Image not found"});
        }
        res.set("content-Type", image.contentType);
        res.send(image.imageData);
    } catch(error){
        console.error("Fetch image error" , error);
        res.status(500).json({success: false, message:"server error", error: error.message});
    }
});

router.get("/images", async function(req, res) {
    try{
        const images = await Image.find().select("-imageData");
        res.json({success:true, images});
    } catch(error){
        console.error("Fetch Images error:", error);
        res.status(500).json({success:false , message:"Server error", error: error.message});
    }
    
})

module.exports = router;