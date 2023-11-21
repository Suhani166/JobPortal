const {testController} = require("../controllers/testController");
const express = require("express");
const userAuth = require("../middlewares/authMiddleware");


//router object
const router = express.Router();

router.post("/test-post",userAuth ,testController);

module.exports = router;
