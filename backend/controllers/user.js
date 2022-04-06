//importation model
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require ('jsonwebtoken');

/***************  Permet l'enregistrement de l'utilisateur  ******************************/
exports.signup = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const cryptPassword = await hashPassword(password);
    console.log('password:', password);
    console.log('cryptPassword:', cryptPassword);

    const user = new User({email, password: cryptPassword});

	//L'utilisateur est sauvegardé et enregistré dans la base de données
	user
    .save()
	.then(() => res.status(201).json({ message: "User's created !" }))// si ok, statut "201 Created", la requête à réussi, et une ressource a été crée
	.catch((err) => res.status(500).json({message: "User's not created :" + err}))// si erreur statut "500", erreur interne du serveur
};

hashPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
};

fabToken = (email) => {
    const jwtKey =  process.env.JWT_KEY
    const token = jwt.sign({email: email}, jwtKey, {expiresIn: "24h"})
    return token
}
