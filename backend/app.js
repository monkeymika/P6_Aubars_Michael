// Importation de dotenv (variable d'environnement)
require('dotenv').config();
// Importation de express
const express = require('express');
// Creation de l'application express
const app = express();
// Mot de passe de la bdd
const password = process.env.BDD_PASSWORD;// Le mot de passe est stockés dans une variable d'environnement
// Va chercher le package CORS (c'est un middleware qui agit entre la requête et la réponse)
const cors = require("cors");
/************************************** Routes ******************************************************************************/
//route utilisateur
const userRoutes = require("./routes/user");

/************************************* Base de données (mongoose) **********************************************************/
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://Mika:${password}@cluster0.1fjx9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

/************************************ Permet de gérer les CORS ************************************************************/
app.use(cors());

/********************** requetes effectué au format json-(bodyparser est inclus dans la version de express) ***************/
app.use(express.json());

/************************************* route authentification signup *****************************************************/
app.use("/api/auth", userRoutes);

/****************************** app peut être utilisé dans les autres fichiers ***********************/
module.exports = app;