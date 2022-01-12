"use strict";

//--importer package jsonwebtoken pour verifier les token
var jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //utiliser les bloc try et catch pour gerer les erreurs
  try {
    //recup du jwt dans le cookie de session
    var token = req.headers.authorization.split(" ")[1]; //decoder le token utilisation du package jsonwebtoken + fonction verifier
    //Verifier le token + la clef secrete avec dot env

    var decodedToken = jwt.verify(token, "MON_SUPER_TOKEN_SECRET"); //extraire la verif si elle echoue

    var userId = decodedToken.userId; //attribué la valeur de la variable ( userid ) à la clé userId objet

    req.auth = {
      userId: userId
    }; //s'il y a un userid on veut verifier qu'elle correspond bien au token

    if (req.body.userId && parseInt(req.body.userId) !== parseInt(userId)) {
      //renvoyer l'erreur avec throw
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    //renvoyer le catch(401) pb d'authentification
    res.status(401).json({
      error: error | "Requête non authentifiée !"
    });
  }
};