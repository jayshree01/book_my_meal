const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const multer = require('multer');
var storage = multer.diskStorage({
    destination:'public/images',
    filename:function(request,file,cb){
        cb(null , Date.now()+"-"+file.originalname);
    }
});
var upload=multer({storage: storage});

router.post("/add",upload.single("image"),categoryController.add);

router.get("/view",categoryController.view);

module.exports = router;