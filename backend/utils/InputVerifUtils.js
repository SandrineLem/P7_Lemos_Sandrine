//fichier comprenant les fonctions de vérification des inputs des users
module.exports = {
    validUsername: function (value) {
        const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        return usernameRegex.test(value)
    },
    validFirstname: function (value) {
        const firstnameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        return firstnameRegex.test(value)
    },
    validEmail: function (value) {
        const regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
        return regexEmail.test(value)
    },
    validPassword: function (value) {
        //--8 caractères min 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial
        const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/
        return regexPassword.test(value)
    }
};