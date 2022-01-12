"use strict";

var express = require('express');

var router = express.Router();

var messageCtrl = require('../controllers/messageCtrl');

var multer = require('../middleware/multer-config');

var auth = require("../middleware/auth"); //route ----CRUD de l'utilisateur (User)---
//recup tous les messages 


router.get("/", auth, messageCtrl.allMessage);
router.get("/mymessage/:id", auth, messageCtrl.getOneMessage);
router.post("/createmessage", auth, multer, messageCtrl.createMessage);
router["delete"]("/deletemessage/:id", auth, messageCtrl.deleteMessage);
router.put("/updatemessage/:id", auth, multer, messageCtrl.modifyMessage);
module.exports = router;
module.exports = router;