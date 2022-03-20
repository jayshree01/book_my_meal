const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
router.post("/add-package",cartController.addPackge);
router.post("/add-item",cartController.addItem);
router.post("/view",cartController.view);
router.post("/remove-package",cartController.removePackage);
router.post("/remove-item",cartController.removeItem);
router.delete("/delete",cartController.delete);


module.exports = router;