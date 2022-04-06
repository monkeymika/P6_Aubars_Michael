//importation models (pour la base de données)
const User = require("../models/user");

//va cherhcher la dépendance "bcrypt (hashage du password)
const bcrypt = require("bcrypt");

//va chercher la dépendance "jsonwebtoken"
const jwt = require ('jsonwebtoken');

/***************  Permet l'enregistrement de l'utilisateur  ******************************/
exports.signup = async (req, res) => {// "exports.signup" permet d'exporter la fonction
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

// fonction qui hash le mot de passe utilisateur
hashPassword = (password) => {
    const saltRounds = 10; // l'algorythme de hashage sera éxécuté 10 fois
    return bcrypt.hash(password, saltRounds)
};

/********************** Permet le login de l'utilisateur (login)***************************************/ 
exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // Verification de l'enregistrement de l'utilisateur dans la base de données
        const user = await User.findOne({email:email});
        if (!user) {
			return res.status(401).json({
				error: "Il semblerait que vous ne soyez pas inscrit",
			});
		}
        
        // Verification du mot de passe
        const controlPassword = await bcrypt.compare(password, user.password )// Compare les mots de passe
        if (!controlPassword) {
            res.status(403).json({message:"Votre mot de passe est faux"})
        };
        
        // login validé : email + password = ok
        const token = fabToken(email)
        if (controlPassword) {
            res.status(200).json({message: "L'utilisateur est bien enregistré dans la base de données"})
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Nous rencontrons actuellement un soucis au niveau du serveur"})
    }
};

//
fabToken = (email) => {
    const jwtKey =  process.env.JWT_KEY
    const token = jwt.sign({email: email}, jwtKey, {expiresIn: "24h"})
    return token
};
