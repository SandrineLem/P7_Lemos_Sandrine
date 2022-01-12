"use strict";

/*--m'informer des erreurs 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/
var bcrypt = require("bcrypt");

var models = require("../models");

var jwt = require('jsonwebtoken');

var verifInput = require("../utils/InputVerifUtils");
/*--creation d'un utilisateur
        -verification du contenu inscrit par l'utilisateur
        -champs non vide 
        -champs valide avec la verif des inputs
        -si nx utilisateur crypt du mdp + creation nx model user
        -sinon message d'erreur 
*/


exports.signup = function (req, res, next) {
  var username = req.body.username;
  var firstname = req.body.firstname;
  var email = req.body.email;
  var password = req.body.password;

  if (username == null || firstname == null || email == null || password == null) {
    res.status(400).json({
      error: "Paramètre manquant !"
    });
  }

  var usernameOk = verifInput.validUsername(username);
  console.log(usernameOk);
  var firstnameOk = verifInput.validFirstname(firstname);
  console.log(firstnameOk);
  var emailOk = verifInput.validEmail(email);
  console.log(emailOk);
  var mdpOk = verifInput.validPassword(password);
  console.log(mdpOk);

  if (usernameOk == true && firstnameOk == true && emailOk == true && mdpOk == true) {
    models.User.findOne({
      where: {
        email: email
      }
    }).then(function (user) {
      console.log(user);

      if (user === null) {
        bcrypt.hash(password, 10).then(function (bcryptPassword) {
          models.User.create({
            username: username,
            firstname: firstname,
            email: email,
            password: bcryptPassword,
            isAdmin: false
          }).then(function (newUser) {
            res.status(201).json({
              id: newUser.id
            });
          })["catch"](function (error) {
            res.status(500).json({
              error: error
            });
          });
        });
      } else {
        res.status(409).json({
          error: "Utilisateur existe déjà !"
        });
      }
    })["catch"](function (error) {
      res.status(500).json({
        error: error
      });
    });
  }
};
/*--connexion utilisateur
    -connexion utilisateur
    -recup des parametre email mdp
    - verif des champs 
    -verif si l'email existe déjà
    -Si on trouve l'utilisateur vrif mdp
    -comparer le mdp salé ds la bdd avec le mdp saisie
*/


exports.login = function (req, res, next) {
  var email = req.body.email;
  console.log(email);
  var password = req.body.password;

  if (email === null || password === null) {
    res.status(400).json({
      error: "Parametre manquant !"
    });
  }

  models.User.findOne({
    where: {
      email: email
    }
  }).then(function (user) {
    if (user) {
      console.log(user);
      console.log(user.password);
      console.log(password);
      bcrypt.compare(password, user.password, function (errrorCompPawd, resComparePassword) {
        if (resComparePassword) {
          res.status(200).json({
            userId: user.id,
            //--appele la fonction sign
            token: jwt.sign( //données que l'on souhaite encoder
            {
              userId: user.id
            }, //ajout du secret token via dotenv
            "MON_SUPER_TOKEN_SECRET", //expiration
            {
              expiresIn: "24h"
            })
          });
        } else {
          res.status(403).json({
            error: "Mot de passe incorrect !"
          });
        }
      });
    } else {
      res.status(404).json({
        error: " Utilisateur inconnu !"
      });
    }
  })["catch"](function (error) {
    res.status(500).json({
      error: error
    });
  });
};
/*--Afficher le profil du compte de l'utilisateur
 */


exports.userProfil = function (req, res, next) {
  var id = req.body.userId;
  console.log(id);
  models.User.findOne({
    attributes: ["id", "email", "username", "isAdmin"],
    where: {
      id: id
    }
  }).then(function (user) {
    return res.status(200).json(user);
  })["catch"](function (error) {
    return res.status(500).json(error);
  });
};
/*---modifier le compte  de l'utilisateur---
    -Récup l'id de l'user et le nouveau mdp
    -verif avec regex de l'input saisie par l'utilisateur
    -Vérifie si différent de l'ancien
    -mettre a jour 
*/


exports.changeProfil = function (req, res, next) {
  var id = req.body.userId;
  var newPassword = req.body.newPassword;
  console.log(newPassword);

  if (verifInput.validPassword(newPassword)) {
    models.User.findOne({
      where: {
        id: id
      }
    }).then(function (user) {
      console.log("user trouvé", user);
      bcrypt.compare(newPassword, user.password, function (errrorCompPawd, resComparePassword) {
        //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
        if (resComparePassword) {
          res.status(406).json({
            error: "Saisie du même mot de passe !"
          });
        } else {
          bcrypt.hash(newPassword, 10, function (error, bcryptNewPassword) {
            models.User.update({
              password: bcryptNewPassword
            }, {
              where: {
                id: id
              }
            }).then(function () {
              return res.status(201).json({
                confirmation: "modification mot de passe effectuée !"
              });
            })["catch"](function (error) {
              return res.status(500).json(error);
            });
          });
        }
      });
    })["catch"](function (error) {
      return res.status(500).json(error);
    });
  } else {
    res.status(406).json({
      error: "mot de passe incorrect !"
    });
  }
}; //--Supprimer un compte utilisateur


exports.deleteProfil = function (req, res) {
  //récup de l'id de l'user
  var id = req.body.userId;

  if (id != null) {
    //Recherche sécurité si user existe bien
    models.User.findOne({
      where: {
        id: id
      }
    }).then(function (user) {
      if (user != null) {
        //Delete de tous les posts de l'user même s'il y en a pas
        models.Message.destroy({
          where: {
            userId: id
          }
        }).then(function () {
          console.log("Tous les messages de cette utilisateurs ont été supprimé"); //Suppression de l'utilisateur

          models.User.destroy({
            where: {
              id: id
            }
          }).then(function () {
            return res.end();
          })["catch"](function (err) {
            return console.log(err);
          });
        })["catch"](function (err) {
          return res.status(500).json(err);
        });
      } else {
        res.status(401).json({
          error: "Cet utilisateur n'existe pas"
        });
      }
    });
  } else {
    res.status(500).json({
      error: "Ce compte ne peut être supprimé, veuillez contacter un administrateur"
    });
  }
};