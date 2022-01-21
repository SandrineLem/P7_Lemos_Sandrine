"use strict";

/*--m'informer des erreurs 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/
var models = require("../models");

var fs = require('fs');

var Message = require('../models/message');

var multer = require('multer');
/* --recuperer tous les messages
   -chercher tous les model de message des utilisateur avec firstname 
   - retourner tous les messages 
*/


exports.allMessage = function (req, res, next) {
  models.Message.findAll({
    attributes: ["id", "titlte", "content", "attachment", "userId", "likes"]
  }).then(function (messages) {
    return res.status(200).json(messages);
  })["catch"](function (error) {
    return res.status(404).json(error);
  });
};
/* --recuperer un message id
    -recup id user (lié au message )
    - chercher le message avec les attributs (grace au id)
    -retourner le message 
    */


exports.getOneMessage = function (req, res, next) {
  var id = req.params.id;
  models.Message.findOne({
    attributes: ["id", "titlte", "content", "attachment", "userId", "likes"],
    where: {
      id: id
    }
  }).then(function (message) {
    return res.status(200).json(message);
  })["catch"](function (error) {
    return res.status(404).json(error);
  });
};
/* --Creer un message 
    -identifier le createur du message avec l'id de l'utilisateur
    -recuperer le contenu 
    -creer le chemin de l'url 
    -creer le message 
*/


exports.createMessage = function (req, res, next) {
  var titlte = req.body.titlte;
  var attachmentURL = "";
  var userId = req.auth.userId;
  models.User.findOne({
    where: {
      id: userId
    }
  }).then(function (user) {
    if (user !== null) {
      var content = req.body.content;

      if (req.file != undefined) {
        attachmentURL = "http://localhost:3000/images/" + req.file.filename;
      } else {
        attachmentURL == null;
      }

      if (content == null) {
        res.status(400).json({
          error: "Aucun contenu à publier !"
        });
      } else {
        models.Message.create({
          titlte: titlte,
          content: content,
          attachment: attachmentURL,
          likes: 0,
          UserId: userId
        }).then(function (newMessage) {
          res.status(201).json(newMessage);
        })["catch"](function (error) {
          res.status(400).json(error);
        });
      }
    } else {
      res.status(400).json(error);
    }
  })["catch"](function (error) {
    return res.status(500).json(error);
  });
};
/*--Supprimer un message*/


exports.deleteMessage = function (req, res, next) {
  var id = req.params.id;
  var userIdMessage = req.params.userid;
  var userId = req.auth.userId;
  models.Message.findOne({
    attributes: ["userId"],
    where: {
      id: id
    }
  }).then(function (message) {
    var id = req.params.id;
    models.Message.destroy({
      where: {
        id: id
      }
    }).then(function () {
      return res.status(200).json({
        message: 'Message supprimé !'
      });
    })["catch"](function (error) {
      return res.status(400).json({
        error: error
      });
    });
    console.log('impossible de supprimer le message !');
  });
};
/* Modifier un message
 */


exports.modifyMessage = function (req, res, next) {
  //Ajouter une condition pour si le id(user) == userid(message) alors il peut modifier le message .
  var userId = req.auth.userId;
  var id = req.params.id;
  var titlte = req.body.titlte;
  var attachmentURL = "";
  models.Message.findOne({
    where: {
      id: id
    }
  }).then(function (message) {
    if (message !== null) {
      var content = req.body.content;

      if (req.file != undefined) {
        attachmentURL = "http://localhost:3000/images/" + req.file.filename;
      } else {
        attachmentURL == null;
      }

      if (content == null) {
        res.status(400).json({
          error: "Aucun contenu à publier !"
        });
      } else {
        models.Message.update({
          titlte: titlte,
          content: content,
          attachment: attachmentURL,
          UserId: userId
        }, {
          where: {
            id: id
          }
        }).then(function (newMessage) {
          res.status(201).json(newMessage);
        })["catch"](function (error) {
          res.status(400).json(error);
        });
      }
    } else {
      res.status(400).json(error);
    }
  })["catch"](function (error) {
    return res.status(500).json(error);
  });
};
/* liker un message 
--------A PREVOIR POUR LA FONCTIONNALITE DES LIKES DES UTILISATEURS-----
 Ajouter une nouvelle tab de liaison dans la base de donnée  pour faire un tableau et inclure les utilisateurs qui like un message 
pour ensuite faire une condition si meme utilisateur like le meme message j'enlève un pour annuler le like. 
------Code en attente de progression ----*/


exports.likeMessage = function (req, res, next) {
  var userId = req.auth.userId;
  var id = req.params.id;
  var likes = req.body.likes; //userLiked...

  switch (likes) {
    case 1:
      models.Message.update({
        where: {
          id: id
        }
      }, {
        $push: {
          userId: userId
        },
        $inc: {
          likes: +1
        }
      }).then(function () {
        return res.status(200).jspn({
          message: "Votre \"like\" \xE0 bien \xE9t\xE9 ajout\xE9!"
        });
      })["catch"](function (error) {
        return res.status(400).json({
          error: error
        });
      });
      break;

    case 0:
      models.Message.findOne({
        attributes: ["userId", "likes"],
        where: {
          id: id
        }
      }).then(function (message) {
        //attente d'ajout d'un tableau userLiked Array []...
        if (message.userId.includes(userLiked)) {
          models.Message.updateOne({
            id: id
          }, {
            $pull: {
              id: id
            },
            $inc: {
              likes: -1
            }
          }).then(function () {
            res.status(200).json({
              message: "Votre \"like\" \xE0 d\xE9j\xE0 \xE9t\xE9 prit en compte!"
            });
          })["catch"](function (error) {
            return res.status(400).json({
              error: error
            });
          });
        }
      })["catch"](function (error) {
        return res.status(404).json({
          error: error
        });
      });
      break;
  }
};