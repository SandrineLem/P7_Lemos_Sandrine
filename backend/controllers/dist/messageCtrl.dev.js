"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

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
  models.Message.findAll().then(function (messages) {
    if (messages > null) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({
        error: 'Pas de message à afficher !'
      });
    }
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
};
/* --recuperer un message id
    -recup id user (lié au message )
    - chercher le message avec les attributs (grace au id)
    -retourner le message 
    */


exports.getOneMessage = function (req, res, next) {
  models.Message.findOne({
    id: req.params.id
  }).then(function (message) {
    return res.status(200).json(message);
  })["catch"](function (error) {
    return res.status(404).json({
      error: error
    });
  });
};
/* --Creer un message 
    
*/

/* --Creer un message 
    -identifier le createur du message avec l'id de l'utilisateur
    -recuperer le contenu 
    -creer le chemin de l'url 
    -creer le message 
*/


exports.createMessage = function (req, res, next) {
  var id = req.auth.userId;
  var titlte = req.body.titlte;
  var attachmentURL = '';
  var userId = req.auth.userId;
  models.User.findOne({
    attributes: ['id', 'email'],
    where: {
      id: id
    }
  }).then(function (user) {
    if (user !== null) {
      var content = req.body.content;

      if (req.file != undefined) {
        attachmentURL = (_readOnlyError("attachmentURL"), "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename));
      } else {
        attachmentURL == null;
      }

      ;

      if (content == null) {
        res.status(400).json({
          error: 'Aucun contenu à publier !'
        });
      } else {
        models.Message.createMessage({
          title: titlte,
          content: content,
          attachmentURL: attachmentURL,
          likes: 0,
          userId: userId
        }).then(function (newMessage) {
          res.status(201).json(newMessage);
        })["catch"](function (error) {
          res.status(400).json(error);
        });
      }

      ;
    } else {
      res.status(400).json(error);
    }
  })["catch"](function (error) {
    return res.status(500).json(error);
  });
};
/*--Supprimer un message*/


exports.deleteMessage = function (req, res, next) {
  Message.findOne({
    id: req.params.id
  }).then(function (message) {
    var filename = message.attachmentURL.split('/images')[1];
    fs.unlink("images/".concat(filename), function () {
      Message.deleteOne({
        id: req.params.id
      }).then(function () {
        return res.status(200).json({
          message: 'Message supprimé !'
        });
      })["catch"](function (error) {
        return res.status(400).json({
          error: error
        });
      });
    });
  })["catch"](function (error) {
    return res.status(500).json({
      error: error
    });
  });
};
/* Modifier un message
 */


exports.modifyMessage = function (req, res, next) {
  var messageObjet = req.file ? _objectSpread({}, JSON.parse(req.body.message), {
    imageUrl: "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename)
  }) : _objectSpread({}, req.body);
  Message.updateOne({
    userId: params.userId
  }, _objectSpread({}, messageObjet, {
    id: req.params.id
  })).then(function () {
    return res.status(200).json({
      message: 'Message modifié !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
};
/* liker un message  */


exports.likeMessage = function (req, res, next) {
  var userId = req.auth.userId;
  var messageId = req.params.id;
  var like = req.body.like;

  switch (like) {
    case 1:
      Message.updateOne({
        _id: messageId
      }, {
        $push: {
          usersLiked: userId
        },
        $inc: {
          likes: +1
        }
      }).then(function () {
        return res.status(200).jspn({
          ùessage: "Votre \"like\" \xE0 bien \xE9t\xE9 ajout\xE9!"
        });
      })["catch"](function (error) {
        return res.status(400).json({
          error: error
        });
      });

    case 0:
      Message.findOne({
        _id: messageId
      }).then(function (message) {
        if (message.usersLiked.includes(userId)) {
          Message.updateOne({
            _id: messageId
          }, {
            $pull: {
              usersLiked: userId
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