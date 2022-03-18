const express = require("express");
const router = express.Router();
const userController = require("../controller/userControlller");

router.post("/signup",userController.signup);
router.post("/signin",userController.signin);
router.get("/view",userController.view);

module.exports = router;