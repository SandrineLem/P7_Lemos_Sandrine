const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');

//route ----CRUD de l'utilisateur (User)---
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/myprofil/:id', userCtrl.userProfil);
router.delete('/delete/:id', userCtrl.deleteProfil);
router.put('/update/:id', userCtrl.changeProfil);

module.exports = router;