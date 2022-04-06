// import de mongoose
const mongoose = require("mongoose");

// import de mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

// Modéle pour l'enregistrement dans la base de données
const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

// sécurité pour empecher l'enregistrement de 2 adresses mail identique dans la base de donnée
userSchema.plugin(uniqueValidator);

// Permet d'utiliser mongoose.model dans les autres fichier
module.exports = mongoose.model("user", userSchema);