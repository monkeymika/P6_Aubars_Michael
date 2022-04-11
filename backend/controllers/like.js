// import du modéle pour la base de données
const Sauce = require("../models/sauce");

exports.likeOrDislike = (req, res, next) => {
     // utilisation de la methode javascript "includes()"
        // utilisation de l'opérateur mongoDB $inc
        // utilisation de l'opérateur mongoDB $push
        // utilisation de l'opérateur mongoDB $pull
    //affichage du req.body
    /* la req sera envoyé par le body au format JSON avec ces 2 propriétés :
    {
        "userID* : "6253f2f68fe088f3d4f7cbd3",
        "like" : - 1 
    } 
    */

    Sauce
    .findOne({_id : req.params.id})
    .then((sauce) => {

        /****************************************** LIKE  *************************************************/
        // like = 1
        if(!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1){
            // mise à jour BDD
            Sauce.updateOne(
                {_id : req.params.id},
                {
                    $inc:{likes: 1},
                    $push:{usersLiked : req.body.userId}// opérateur push
                }
            )
            .then(() => res.status(201).json({message: "like +1"}))
            .catch((err) => res.status(400).json({err}));
        }
        
        //like = 0(aucun choix de l'utilisateur)
        if(sauce.usersLiked.includes(req.body.userId) && req.body.like === 0){
            // mise à jour BDD
            Sauce.updateOne(
                {_id : req.params.id},
                {
                    $inc:{likes: -1},
                    $pull:{usersLiked : req.body.userId}// opérateur pull
                }
            )
            .then(() => res.status(201).json({message: "like 0"}))
            .catch((err) => res.status(400).json({err}));
        }

        /************************************** DISLIKE ******************************************/

        // dislike = 1
        if(!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1){    
            // mise à jour BDD
            Sauce.updateOne(
                {_id : req.params.id},
                {
                    $inc:{dislikes: 1},
                    $push:{usersDisliked : req.body.userId}
                }
            )
            .then(() => res.status(201).json({message: "dislike 1"}))
            .catch((err) => res.status(400).json({err}));
        }

        // dislike = 0 (aucun choix de l'utilisateur)
        if(sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0){
            // mise à jour BDD
            Sauce.updateOne(
                {_id : req.params.id},
                {
                    $inc:{dislikes: -1},
                    $pull:{usersDisliked : req.body.userId}
                }
            )
            .then(() => res.status(201).json({message: "dislike 0"}))
            .catch((err) => res.status(400).json({err}));
        }
    })
    .catch((err) => res.status(404).json({err}))
};