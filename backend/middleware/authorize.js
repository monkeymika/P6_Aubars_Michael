// import
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();


// exportation de la fonction du middleware

module.exports = (req, res, next) => {
	try {
		//récupération du token dans le headers authorize : bearer token
		const token = req.headers.authorization.split(" ")[1];//split permet de faire un tableau du contenu de "authorization" et d'en récuper l'index 1

		//decoder le token
		const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);

		//récupérer le userId à l'intérieur du token decodé
		const userIdToken = decodedToken.userId;

		//comparaison du userId en clair (contenu dans le req) avec le userId qu'il y dans le token
		if(req.body.userId && req.body.userId !== userIdToken){
			throw" user Id non valide"
		} else {
			next()
		}
		
		// les erreurs seront récupérés ici
	} catch (err) {
		res.status(401).json({message: "Vous n'êtes pas authentifié", err: err});
	}
};