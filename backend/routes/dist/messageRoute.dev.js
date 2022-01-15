"use strict";

/*var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/
var express = require('express');

var router = express.Router();

var messageCtrl = require('../controllers/messageCtrl');

var multer = require('../middleware/multer-config');

var auth = require("../middleware/auth"); //route ----CRUD de l'utilisateur (User)---
//recup tous les messages 


router.get("/", auth, messageCtrl.allMessage);
router.get("/:id", auth, messageCtrl.getOneMessage);
router.post("/new", auth, multer, messageCtrl.createMessage);
router.put("/:id", auth, multer, messageCtrl.modifyMessage);
router["delete"]("/:id", auth, messageCtrl.deleteMessage);
router.post("/:id/like", auth, messageCtrl.likeMessage);
module.exports = router;