// Importation d'express
const express = require("express");

// Methode "Router" d'express
const router = express.Router();

//importation du controllers/user.js
const userController = require("../controllers/user");

//route signup
router.post("/signup", userController.signup);

//route login
router.post("/login", userController.login);

// Exportation du module pour pouvoir y acceder de "app.js"
module.exports = router;