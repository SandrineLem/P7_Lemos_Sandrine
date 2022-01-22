"use strict";

var express = require("express");

var router = express.Router();

var userCtrl = require("../controllers/userCtrl");

var auth = require("../middleware/auth"); //route ----CRUD de l'utilisateur (User)---


router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/myprofil", auth, userCtrl.userProfil);
router["delete"]("/deleteProfil", auth, userCtrl.deleteProfil);
router.put("/updateProfil", auth, userCtrl.changeProfil);
router["delete"]("/deleteProfil", auth, userCtrl.deleteAdminUser);
module.exports = router;