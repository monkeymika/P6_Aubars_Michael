//importation models (pour la base de données)
const User = require("../models/user");

//va chercher la dépendance "bcrypt (hashage du password)
const bcrypt = require("bcrypt");

//va chercher la dépendance "jsonwebtoken"
const jwt = require ('jsonwebtoken');

/***************  Permet l'inscription de l'utilisateur dans la base de données(signup)  ******************************/

exports.signup = (req, res, next) => {
	bcrypt
	.hash(req.body.password, 10)
	.then((hash) => {
		const user = new User({
			email: req.body.email,
			password: hash,
		});

		user// l'utilisateur est envoyé dans la base de données
        .save()
		.then(() =>
			res.status(201).json({ message: "Un utilisateur à bien été crée !!" })
		)
		.catch((error) => res.status(400).json({ error }));
	})
	.catch((error) => {
		res.status(500).json({
			error: error,
			message: "L'utilisateur n'a pas pu être crée",
		});
	});
};

/********************** Permet à l'utilisateur de retrouver son comtpe dans la base de données (login)***************************************/ 

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
        
        // Verification du mot de passe (envoyé par le front)
        const controlPassword = await bcrypt.compare(password, user.password )// Compare les mots de passe
        if (!controlPassword) {
            res.status(403).json({message:"Votre mot de passe est faux"})
        };
        
        // login validé : email + password = ok
        //envoie dans la réponse du serveur, du userId et du token d'authentification
        res.status(200).json({
			userId: user._id,
			token: jwt.sign({ userId: user._id }, `${process.env.JWT_KEY}`, {
				expiresIn: "24h",
			}),
		});
	} catch {
		(error) => {return res.status(500).json({ error });};
	}
};
