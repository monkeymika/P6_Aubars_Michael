// Importation d'express
const express = require("express");

// import de multer pour la gestion des images
const multer = require("../middleware/multer");

// Methode "Router" d'express
const router = express.Router();

//importation du controllers/sauces.js
const saucesController = require("../controllers/sauces");

//importation du middleware d'authentification
const authorize = require("../middleware/authorize");

/************************** Routes ********************************************************/

//creation des sauces
router.post("/", authorize, multer, saucesController.createSauce);

//afficher toutes les sauces
router.get("/", authorize, saucesController.readAllSauces);

//afficher une seule sauce
router.get("/:id", authorize, saucesController.readOneSauce);

// modifier la sauce
router.put("/:id", authorize, multer, saucesController.updateSauce);

// effacer la sauce
router.delete("/:id", authorize, saucesController.deleteSauce);

/************************ export *******************************************************/

// Exportation du module pour pouvoir y acceder de "app.js"
module.exports = router;