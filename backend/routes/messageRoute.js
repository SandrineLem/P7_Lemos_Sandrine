const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/messageCtrl');
const multer = require('../middleware/multer-config');

//route ----CRUD de l'utilisateur (User)---
//recup tous les messages 
router.get("/", messageCtrl.allMessage);
router.get("/mymessage/:id",messageCtrl.getOneMessage);
router.post("/createmessage", multer, messageCtrl.createMessage);
router.delete("/deletemessage/:id",messageCtrl.deleteMessage);
router.put("/updatemessage/:id", multer, messageCtrl.modifyMessage);


module.exports = router;