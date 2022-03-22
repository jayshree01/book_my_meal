const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemController");


const multer = require('multer');
var storage = multer.diskStorage({
    destination:'public/images',
    filename:function(request,file,cb){
        cb(null , Date.now()+"-"+file.originalname);
    }
});
var upload=multer({storage: storage});


router.post("/add",upload.single("image"),itemController.add);
router.get("/view",itemController.view);
router.delete("/delete",itemController.delete);
router.post("/edit",upload.single("image"),itemController.edit);

module.exports = router;