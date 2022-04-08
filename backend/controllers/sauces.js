// import du modéle pour la base de données
const Sauce = require("../models/sauce");

/***********************************************************************************************************************************/
/****************************************** CRUD (Create, Read, Update, Delete) ****************************************************/
/***********************************************************************************************************************************/


/********************************* La sauce est crée ****************************************************************/

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce =  new Sauce({
        ...sauceObject, // utilisation de l'opérateur spread pour copier un objet
        imageUrl: `${req.protocol}://${req.get("host")}/images/${// permet de récupérer l'image
			req.file.filename
		}`
    });

    sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((err) => res.status(400).json({err}))
    console.log(sauce);
};

/********************************** Affiche toutes les sauces ********************************************************* */

exports.readAllSauces = (req, res, next) => {
	Sauce.find()
		.then((sauce) => res.status(200).json(sauce))
		.catch((err) => res.status(400).json({ err }));
};

/******************************** Affiche une seule sauce ****************************************************************/

exports.readOneSauce = (req, res, next) => {
   Sauce.findOne({ _id : req.params.id})//Ici on rajoute "_" à la clé "id", pour correspondre à "_id" de la bdd
   .then((sauce) => res.status(200).json(sauce))
	.catch((error) =>
		res.status(404).json({
			error: error,
			message: "La sauce n'est pas accessible"
		})
	);
};

/*************************************** Modifier la sauce **************************************************************/

exports.updateSauce = (req, res, next) => {
    // Modification qui seront envoyé dans la base de données
    Sauce
    .updateOne({_id: req.params.id}, {...req.body, _id: req.params.id })// methode mangoDb pour modifier un seul document dans la collection
    .then(() => res.status(200).json({message: "la sauce à été modifié"}))
    .catch(err => res.status(400).json({err}))
};

/*************************************** Effacer la sauce **************************************************************/

exports.deleteSauce = (req, res, next) => {
    Sauce
    .deleteOne({ _id : req.params.id})
    .then(() => res.status(200).json({message: "la sauce à été supprimé"}))
    .catch(err => res.status(400).json({err}))
};
