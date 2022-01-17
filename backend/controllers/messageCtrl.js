/*--m'informer des erreurs 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/

const models = require("../models");
const fs = require('fs');
const Message = require('../models/message');
const multer = require('multer')


/* --recuperer tous les messages
   -chercher tous les model de message des utilisateur avec firstname 
   - retourner tous les messages 
*/
exports.allMessage = (req, res, next) =>{
    models.Message.findAll({ 
        attributes: ["id", "titlte", "content", "userId", "likes"]
     })
    .then((messages) => res.status(200).json(messages))
    .catch((error) => res.status(404).json(error));
};

/* --recuperer un message id
    -recup id user (lié au message )
    - chercher le message avec les attributs (grace au id)
    -retourner le message 
    */


exports.getOneMessage = (req, res, next) =>{
    const id = req.params.id;
    models.Message.findOne({ 
        attributes: ["id", "titlte", "content", "userId", "likes"],
        where: { id: id },
     })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json(error));
};

/* --Creer un message 
    -identifier le createur du message avec l'id de l'utilisateur
    -recuperer le contenu 
    -creer le chemin de l'url 
    -creer le message 
*/
exports.createMessage = (req, res, next) => {
    const titlte = req.body.titlte;
    const attachmentURL = "";
    const userId = req.auth.userId;

    models.User.findOne({
            where: { id: userId },
        })
        .then((user) => {
            if (user !== null) {
                const content = req.body.content;
                if (req.file != undefined) {
                    attachmentURL = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
                } else {
                    attachmentURL == null;
                }
                if (content == null) {
                    res.status(400).json({ error: "Aucun contenu à publier !" });
                } else {
                    models.Message.create({
                            titlte: titlte,
                            content: content,
                            attachmentURL: attachmentURL,
                            likes: 0,
                            UserId: userId,
                        })
                        .then((newMessage) => {
                            res.status(201).json(newMessage);
                        })
                        .catch((error) => {
                            res.status(400).json(error);
                        });
                }
            } else {
                res.status(400).json(error);
            }
        })
        .catch((error) => res.status(500).json(error));
};

/*--Supprimer un message*/

exports.deleteMessage = (req, res, next) => {
    const id = req.params.id;
    const userIdMessage = req.params.userid;
    const userId = req.auth.userId;
    models.Message.findOne({
        attributes: ["userId"],
        where: { id: id },
     })
    .then((message) => {
            const id = req.params.id;
            models.Message.destroy({
                where: { id: id },
            })
            .then(() => res.status(200).json({ message: 'Message supprimé !'}))
            .catch(error => res.status(400).json({ error }))
        
            console.log('impossible de supprimer le message !')
        })
       };


/* Modifier un message
 */

exports.modifyMessage = (req, res, next) => {
    //Ajouter une condition pour si le id(user) == userid(message) alors il peut modifier le message . 
    const userId = req.auth.userId;
    const id = req.body.id;
    models.Message.findOne({
        attributes: ["userId", "id", "titlte", "content", ],
        where: { id: id },
    });
    
    models.Message.update({titlte: req.body.titlte, content: req.body.content},
        { where: { id: id } })
    .then(() => res.status(200).json ({ message: 'Message modifié !'}))
    .catch( error => res.status(400).json({ error }))     
};

/* liker un message  */
exports.likeMessage = (req, res, next) =>{
    const userId = req.auth.userId;
    let id = req.body.id
    let like = req.body.like

    switch (like){
        case 1 :
        models.Message.update( 
            { where: { userId: userId } }, 
            { $push: { usersLiked: userId}, $inc: { likes: +1}})
        .then(() => res.status(200).jspn({ message: `Votre "like" à bien été ajouté!`}))
        .catch((error) => res.status(400).json ({ error }));
        case 0 :
        models.Message.findOne({likes: req.body.likes}, 
            {where: { id: id }},)
        .then((message) => {
            if (message.usersLiked.includes(userId)){
                models.Message.updateOne({ id: id }, {$pull: { usersLiked: userId}, $inc: {likes: -1}})
                .then(() => { res.status(200).json({ message: `Votre "like" à déjà été prit en compte!`})})
                .catch((error) => res.status(400).json ({ error }))
            }
        })
        .catch((error) => res.status(404).json({ error }))
            break;
    }
};