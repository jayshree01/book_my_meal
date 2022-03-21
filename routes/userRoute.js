const express = require("express");
const router = express.Router();
const userController = require("../controller/userControlller");

router.post("/signup",userController.signup);
router.post("/signin",userController.signin);
router.get("/view",userController.view);
router.post("/add-to-fav-package",userController.addToFavPackage);
router.post("/add-to-fav-item",userController.addToFavItem);
router.post("/add-to-block",userController.addToBlock);
router.post("/remove-from-block",userController.removeFromBlock);
router.get("/verifyByEmail/:id",userController.verified);
router.post("/forget-password",userController.forgetPassword);
router.get("/forget/:email",userController.forget);
router.post("/change-password",userController.changePassword);
router.post("/fav-foods",userController.viewFoods);
router.post("/search",userController.search);
router.post("/update",userController.update);
module.exports = router;