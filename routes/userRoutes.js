const express = require("express");
const userAuth = require("../middlewares/authMiddleware");
const {
	updateUserController,
	getUserController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routes

//GET USER DATA||POST
router.post("/getUser", userAuth, getUserController);
//UPDATE USER||PUT
router.put("/update-user", userAuth, updateUserController);

module.exports = router;
