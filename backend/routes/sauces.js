// Importation d'express
const express = require("express");

// Methode "Router" d'express
const router = express.Router();

//importation du controllers/sauces.js
const saucesController = require("../controllers/sauces");

// Routes
router.post("/", saucesController.createSauce);

//afficher toutes les sauces
router.get("/", saucesController.readAllSauce);

//export
// Exportation du module pour pouvoir y acceder de "app.js"
module.exports = router;