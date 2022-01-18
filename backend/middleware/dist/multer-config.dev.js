"use strict";

/* 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/
//--------middleware pour enregistrer les images du fronted dans le dossier image--
//configuration multer pour les affichages images 
var multer = require('multer'); //importer fs


var fs = require('fs');

var dir = "./images";
var MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
}; //objet de confi pour multer avec diskStorage() pour l'enregistrer sur le disque 

var storage = multer.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, 'images');
  },
  //expliquer quel nom de fichier utiliser 
  filename: function filename(req, file, callback) {
    //si on ne trouve de dossier images
    if (!fs.existsSync(dir)) {
      //créer le dossier images
      fs.mkdirSync(dir);
    }

    var name = file.originalname.split(' ').join('_');
    var extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
}); //exporter le fichier unique d'image 

module.exports = multer({
  storage: storage
}).single('image');