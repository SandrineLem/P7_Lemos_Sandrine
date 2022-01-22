const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
//route ----CRUD de l'utilisateur (User)---
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/myprofil", auth, userCtrl.userProfil);
router.delete("/deleteProfil", auth, userCtrl.deleteProfil);
router.put("/updateProfil", auth, userCtrl.changeProfil);
router.delete("/deleteProfil", auth, userCtrl.deleteAdminUser);
module.exports = router;