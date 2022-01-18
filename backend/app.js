/*--m'informer des erreurs 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');

app.use(express.json());

//donner accès au chemin du syteme de fichier
const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Parser les corps des requête + forcer parse d'objets inclus dans d'autres objets
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/user', userRoute);
//importer la route message --!!!!!!
app.use('/api/message', messageRoute);

module.exports = app;