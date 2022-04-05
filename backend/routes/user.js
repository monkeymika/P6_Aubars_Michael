const express = require("express");
const router = express.Router();

//importation du controller user
const userController = require("../controllers/user");

//route signup
router.post("/signup", userController.signup);

module.exports = router;