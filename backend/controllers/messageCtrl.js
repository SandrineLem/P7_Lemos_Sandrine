/*--m'informer des erreurs 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/
const utils = require("../utils/jwtUtils");
const models = require("../models");
const fs = require('fs');
const Message = require('../models/message');


/* --recuperer tous les messages
   -chercher tous les model de message des utilisateur avec firstname 
   - retourner tous les messages 
*/
exports.allMessage = (req, res, next) =>{
    models.Message.findAll()
    .then(messages => {
        if (messages > null){

           res.status(200).json(messages) 
        }else{
            res.status(404).json({ error: 'Pas de message à afficher !'})
        }
    })
    .catch(error =>res.status(400).json({ error }))
};

/* --recuperer un message id
    -recup id user (lié au message )
    - chercher le message avec les attributs (grace au id)
    -retourner le message 
    */


exports.getOneMessage = (req, res, next) =>{
    
    models.Message.findOne({ userId: req.params.userId})
    .then(message => res.status(200).json(message))
    .catch(error => res.status(404).json ({ error }));
};

    


/* --Creer un message 
    
*/
/* --Creer un message 
    -identifier le createur du message avec l'id de l'utilisateur
    -recuperer le contenu 
    -creer le chemin de l'url 
    -creer le message 
*/
exports.createMessage = (req, res, next) => {
    const userId = req.body.userId;
    const titlte = req.body.titlte;
    const attachmentURL = '';


    models.User.findOne({
        attributes : ['id', 'email', 'username'],
        where: { userId: userId }
    })
    .then(user =>{
        if(user !== null){
            const content = req.body.content;
        if(req.body.file != undefined){
            attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        else{
            attachmentURL == null
        };
        if((content == null )){
            res.status(400).json({ error: 'Aucun contenu à publier !'})
        }else{
            models.Message.createMessage({
                titlte : titlte,
                content: content,
                attachmentURL: attachmentURL,
                likes: 0,
                UserId: userId
            })
            .then((newMessage) =>{
                res.status(201).json(newMessage)
            })
            .catch((error) =>{
                res.status(500).json(error)
            })
        };
        }else{
            res.status(400).json(error)
        }
        
    })
    .catch(error => res.status(500).json(error));
};

/*--Supprimer un message*/

exports.deleteMessage = (req, res, next) => {
    Message.findOne({ id: req.params.id })

    .then(message =>{ 
        const filename = message.attachmentURL.split('/images')[1];
        fs.unlink(`images/${filename}`, () => {
            Message.deleteOne({ id: req.params.id })
            .then(() => res.status(200).json({ message: 'Message supprimé !'}))
            .catch(error => res.status(400).json({ error }))
        })
    })
    .catch(error => res.status(500).json({ error }));
};

/* Modifier un message
 */

exports.modifyMessage = (req, res, next) => {
    const messageObjet = req.file ?
    {
        ...JSON.parse(req.body.message),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    } : { ...req.body };
    Message.updateOne({ userId: params.userId}, { ...messageObjet, id: req.params.id})
    .then(() => res.status(200).json ({ message: 'Message modifié !'}))
    .catch( error => res.status(400).json({ error }))
};

/* liker un message  */
exports.likeMessage = (req, res, next) =>{
    let userId = req.body.userId
    let messageId = req.params.id
    let like = req.body.like

    switch (like){
        case 1 :
        Message.updateOne({ _id: messageId }, { $push: { usersLiked: userId}, $inc: { likes: +1}})
        .then(() => res.status(200).jspn({ ùessage: `Votre "like" à bien été ajouté!`}))
        .catch((error) => res.status(400).json ({ error }));
        case 0 :
        Message.findOne({ _id: messageId },)
        .then((message) => {
            if (message.usersLiked.includes(userId)){
                Message.updateOne({ _id: messageId}, {$pull: { usersLiked: userId}, $inc: {likes: -1}})
                .then(() => { res.status(200).json({ message: `Votre "like" à déjà été prit en compte!`})})
                .catch((error) => res.status(400).json ({ error }))
            }
        })
        .catch((error) => res.status(404).json({ error }))
            break;
    }
};