const express = require("express");
const router = express.Router();
const packageController = require("../controller/packageController");

const multer = require('multer');
var storage = multer.diskStorage({
    destination:'public/images',
    filename:function(request,file,cb){
        cb(null , Date.now()+"-"+file.originalname);
    }
});
var upload=multer({storage: storage});


router.post("/add",upload.single("image"),packageController.add);
router.get("/view",packageController.view);
router.post("/edit",upload.single("image"),packageController.edit);
router.delete("/delete",packageController.delete);
router.get("/available-packages",packageController.availablePackages);
router.get("/today-meal-option",packageController.todayMealOption);

module.exports = router;