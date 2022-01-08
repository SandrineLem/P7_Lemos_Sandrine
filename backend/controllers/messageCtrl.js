/*--m'informer des erreurs 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/
const utils = require("../utils/jwtUtils");
const models = require("../models");
const fs = require('fs');

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
    const id = utils.getUserId(req.headers.authorization)
    models.Message.findOne({
        attributes: ["id", 'titlte', "content", "attachnment", "likes"],
        where: { id: id }
    })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(500).json(error))
};
    


/* --Creer un message 
    -identifier le createur du message avec l'id de l'utilisateur
    -recuperer le contenu 
    -creer le chemin de l'url 
    -creer le message 
*/
exports.createMessage = (req, res, next) => {
    const id = utils.getUserId(req,Headers.authorization)

    models.User.findOne({
        attributes : ['id', 'email', 'username'],
        where: { id: id }
    })
    .then(user =>{
        if(user !== null){
            const content = req.body.content;
        if(req.file != undefined){
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
                UserId: user.id
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
    .catch(error.status(500).json(error));
};

/*--Supprimer un message*/

exports.deleteMessage = (req, res, next) => {
    const id = utils.getUserId(req.headers.authorization)
    console.log(id)

    Message.findOne({id: req.params.id})

    .then( message =>{
        const filename = message.attachmentURL.split('/images')[1];
        fs.unlink(`images/${filename}`, () =>{
            Message.deleteOne({id: req.params.id})
            .then(() => res.status(200).json({message: 'Message supprimé !'}))
            .catch(error => res.status(400).json({ error }))
        })
    })
    .catch(error => res.status(500).json({ error }));
};

/* Modifier un message
 */

exports.modifyMessage = (req, res, next) => {
    const id = utils.getUserId(req.headers.authorization)
    const messageObjet = req.file ?
    {
        ...JSON.parse(req.body.message),
        attachmentURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Message.updateOne({ id: req.params.id}, {...messageObjet, id: req.params.id})
    .then(() =>res.status(200).json ({ message: 'Le message à bien été modifié !'}))
    .catch(error => res.status(400).json({ error}))
}