// Importation d'express
const express = require("express");
const router = express.Router();// Methode "Router" d'express

//importation du controller user
const userController = require("../controllers/user");

//route signup
router.post("/signup", userController.signup);

//route login

// Exportation du module pour pouvoir y acceder de "app.js"
module.exports = router;