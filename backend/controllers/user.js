//importation model
const User = require("../models/user");

/***************  Permet l'enregistrement de l'utilisateur  ******************************/
exports.signup = (req, res, next) => {
	const user = new User({
		email: req.body.email,
		password: req.body.password
	});

	//L'utilisateur est sauvegardé et enregistré dans la base de données
	user
    .save()
	.then(() => res.status(201).json({ message: "User's created !" }))// si ok, statut "201 Created", la requête à réussi, et une ressource a été crée
	.catch((err) => res.status(500).json({message: "User's not created :" + err}))// si erreur statut "403 Forbidden", le serveur comprend la requête mais refuse de l'utiliser
};
