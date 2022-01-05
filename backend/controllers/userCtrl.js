/*--m'informer des erreurs 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/

const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models/user');
const utils = require('../utils/jwtutils');
const verifInput = require ('../utils/InputVerifUtils');



/*--creation d'un utilisateur
        -verification du contenu inscrit par l'utilisateur
        -champs non vide 
        -champs valide avec la verif des inputs
        -si nx utilisateur crypt du mdp + creation nx model user
        -sinon message d'erreur 
*/

exports.signup = (req, res, next) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;

    if (username == null || firstname == null || email == null || password == null){
        res.status(400).json ( { error : 'Paramètre manquant !'})
    }
    const usernameOk = verifInput.validUsername(username)
    console.log(usernameOk)
    const firstnameOk = verifInput.validFirstname(firstname)
    console.log(firstnameOk)
    const emailOk = verifInput.validEmail(email);
    console.log(emailOk)
    const mdpOk = verifInput.validPassword(password);
    console.log(mdpOk)
    
    if (usernameOk == true && firstname == true && emailOk == true && mdpOk == true){
        models.User.findOne({
            attibutes:{email: email}
        })
        .then(user => {
            if(!user){
                bcrypt.hash(password, 10, function (error, bcryptPassword){
                    const newUser = models.User.create({
                        username: username,
                        firstname: firstname,
                        email : email,
                        password : bcryptPassword,
                        isAdmin: false
                    })
                    console.log(newUser)
                    .then(newUser => {
                        res.status(201).json({ 'id': newUser.id }) })
                    .catch(error => {
                        res.status(500).json({ error })
                    })
                })
            }else{
                res.status(409).json({ error: 'Utilisateur existe déjà !'})
            }
        })
        .catch (error => {
            res.status(500).json ({ error })
        })
    }
};
/*--Afficher le profil du compte de l'utilisateur
*/ 

exports.userProfil = (req, res, next) =>{
    const id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'username', 'isAdmin'],
        where: { id: id }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
};

//--connexion utilisateur 

exports.login = (res, req, next)=> {
    const username = req.body.username;
    const password = req.body.password;
    if ( username == null || password == null ){
        res.status(400).json({ error : 'Parametre manquant !'})
    }
    models.User.findOne({
        where: { username: username }
    })
    .then(user =>{
        if (user){
            bcrypt.compare(password, user.password, (resComparePassword) =>{
                if (resComparePassword){
                    res.status(200).json({
                        userId : user.id,
                        token: utils.generateTokenForUser(user),
                        isAdmin: user.isAdmin
                    })
                }else{
                    res.status(403).json ( { error : 'Mot de passe incorrect !'})
                }
            })
        }else{
            res.status(404).json ({ error : ' Utilisateur inconnu !' })
        }
    })
    .catch(err => { res.status(500).json({ error }) })
};

/*---modifier le compte  de l'utilisateur---
    -Récup l'id de l'user et le nouveau mdp
    -verif avec regex de l'input saisie par l'utilisateur
    -Vérifie si différent de l'ancien
*/
exports.changeProfile = (req, res) => {
    
    
    const userId = utils.getUserId(req.headers.authorization);
    const newPassword = req.body.newPassword;
    console.log(newPassword)

    console.log('admin', verifInput.validPassword(newPassword))
    if (verifInput.validPassword(newPassword)) {
        
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                console.log('user trouvé', user)
                bcrypt.compare(newPassword, user.password, (resComparePassword) => {
                    //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                    if (resComparePassword) {
                        res.status(406).json({ error: 'Saisie du même mot de passe !' })
                    } else {
                        bcrypt.hash(newPassword, 10, function ( bcryptNewPassword) {
                            models.User.update(
                                { password: bcryptNewPassword },
                                { where: { id: user.id } }
                            )
                                .then(() => res.status(201).json({ confirmation: 'modification mot de passe effectuée !' }))
                                .catch(error => res.status(500).json(error))
                        })
                    }
                })
            })
            .catch(err => json(err))
    } else {
        res.status(406).json({ error: 'mot de passe incorrect !' })
    }
};


//--Supprimer un compte utilisateur

exports.deleteProfile = (req, res) => {
    //récup de l'id de l'user
    let userId = utils.getUserId(req.headers.authorization);
    if (userId != null) {
        //Recherche sécurité si user existe bien
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                if (user != null) {
                    //Delete de tous les posts de l'user même s'il y en a pas
                    models.Post
                        .destroy({
                            where: { userId: user.id }
                        })
                        .then(() => {
                            console.log('Tous les messages de cette utilisateurs ont été supprimé');
                            //Suppression de l'utilisateur
                            models.User
                                .destroy({
                                    where: { id: user.id }
                                })
                                .then(() => res.end())
                                .catch(err => console.log(err))
                        })
                        .catch(err => res.status(500).json(err))
                }
                else {
                    res.status(401).json({ error: 'Cet utilisateur n\'existe pas' })
                }
            })
    } else {
        res.status(500).json({ error: 'Ce compte ne peut être supprimé, veuillez contacter un administrateur' })
    }
};
