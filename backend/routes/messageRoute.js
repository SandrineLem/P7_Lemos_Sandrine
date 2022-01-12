const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/messageCtrl');
const multer = require('../middleware/multer-config');
const auth = require("../middleware/auth");
//route ----CRUD de l'utilisateur (User)---
//recup tous les messages 
router.get("/",auth, messageCtrl.allMessage);
router.get("/mymessage/:id", auth,messageCtrl.getOneMessage);
router.post("/createmessage",auth, multer, messageCtrl.createMessage);
router.delete("/deletemessage/:id",auth,messageCtrl.deleteMessage);
router.put("/updatemessage/:id",auth, multer, messageCtrl.modifyMessage);


module.exports = router;


module.exports = router;