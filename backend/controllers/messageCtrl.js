/*--m'informer des erreurs 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/

const models = require("../models");
const fs = require('fs');
const Message = require('../models/message');
const multer = require('multer');


/* --recuperer tous les messages
   -chercher tous les model de message des utilisateur avec firstname 
   - retourner tous les messages 
*/
exports.allMessage = (req, res, next) =>{
    models.Message.findAll({ 
        attributes: ["id", "titlte", "content", "attachment", "userId", "likes"] 
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
        attributes: ["id", "titlte", "content", "attachment", "userId", "likes"],
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
    let attachmentURL = "";
    const userId = req.auth.userId;

    models.User.findOne({
            where: { id: userId },
        })
        .then((user) => {
            if (user !== null) {
                const content = req.body.content;
                if (req.file != undefined) {
                    attachmentURL = "http://localhost:3000/images/" + req.file.filename;
                } else {
                    attachmentURL == null;
                }
                if (content == null) {
                    res.status(400).json({ error: "Aucun contenu à publier !" });
                } else {
                    models.Message.create({
                            titlte: titlte,
                            content: content,
                            attachment: attachmentURL,
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
    const id = req.params.id;
    const titlte = req.body.titlte;
    let attachmentURL = "";
    models.Message.findOne({
            where: { id: id },
        })
        .then((message) => {
            if (message !== null) {
                const content = req.body.content;
                if (req.file != undefined) {
                    attachmentURL = "http://localhost:3000/images/" + req.file.filename;
                } else {
                    attachmentURL == null;
                }
                if (content == null) {
                    res.status(400).json({ error: "Aucun contenu à publier !" });
                } else {
                    models.Message.update({
                            titlte: titlte,
                            content: content,
                            attachment: attachmentURL,
                            UserId: userId,
                        }, { where: { id: id } })
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

/* liker un message 
--------A PREVOIR POUR LA FONCTIONNALITE DES LIKES DES UTILISATEURS-----
 Ajouter une nouvelle tab de liaison dans la base de donnée  pour faire un tableau et inclure les utilisateurs qui like un message 
pour ensuite faire une condition si meme utilisateur like le meme message j'enlève un pour annuler le like. 
------Code en attente de progression ----*/


exports.likeMessage = (req, res, next) =>{
    const userId = req.auth.userId;
    let id = req.params.id;
    let likes = req.body.likes;
    //userLiked...
    switch (likes){
        case 1 :
        models.Message.update({
             where: { id: id } }, 
            { $push: { userId: userId }, $inc: { likes: +1 }})
        .then(() => res.status(200).jspn({ message: `Votre "like" à bien été ajouté!`}))
        .catch((error) => res.status(400).json ({ error }));
            break;
        case 0 :
        models.Message.findOne({
            attributes: ["userId", "likes"],
            where: { id: id },
        })
            
        .then((message) => {
            //attente d'ajout d'un tableau userLiked Array []...
            if (message.userId.includes(userLiked)){
                models.Message.updateOne({ id: id }, {$pull: { id: id}, $inc: {likes: -1}})
                .then(() => { res.status(200).json({ message: `Votre "like" à déjà été prit en compte!`})})
                .catch((error) => res.status(400).json ({ error }))
            }
        })
        .catch((error) => res.status(404).json({ error }))
            break;
    }
};