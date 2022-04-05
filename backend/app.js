require('dotenv').config();
// Importation de express
const express = require('express');
// Creation de l'application express
const app = express();
// Mot de passe de la bdd
const password = process.env.BDD_PASSWORD;// Le mot de passe est stockés dans une variable d'environnement
// Va chercher le package CORS (c'est un middleware qui agit entre la requête et la réponse)
const cors = require("cors");

/******************* Base de données (mongoose) ************************/
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://Mika:${password}@cluster0.1fjx9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;

/****************** Permet de gérer les CORS *****************/
app.use(cors());

/************************* app.use()M route générale et la fonciton (middleware) ************************* */

app.use((req, res) => {
  res.json({message : "la route fonctionne ! "})
});
app.use(express.json());