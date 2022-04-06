// import du modéle pour la base de données
const Sauce = require("../models/sauce");

exports.createSauce = (req, res, next) => {
    const sauceObject = req.body.sauce;
    const sauce =  new Sauce({
        ...sauceObject,
    });

    sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((err) => res.status(400).json({err}))
};

exports.readAllSauce = (req, res, next) => {
	Sauce.find()
		.then((sauce) => res.status(200).json(sauce))
		.catch((err) => res.status(400).json({ err }));
};