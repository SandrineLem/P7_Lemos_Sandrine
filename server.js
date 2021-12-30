var express = require('express');

//instanciation server 
var server = express();

//config routes 
server.get('/', function (req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour le server ca se met a jour tout est ok </h1>');
});

//ecoute du server 
server.listen(3306, function(){
    console.log('server en ecoute')
});