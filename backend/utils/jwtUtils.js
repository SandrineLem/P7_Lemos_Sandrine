const jwt = require('jsonwebtoken');

module.exports ={
    tokenForSign: 'MON_SUPER_TOKEN_SECRET',
    generateToken : function (user){
        return jwt.sign({
            userId: user.id,
            isAdmin: user.isAdmin
        },
        this.tokenForSign,{
            expiresIn: '24h'
        })
    },
    getUserId: function (data) {
        if (data.lenght > 1) {
            const token = data.split(' ')[1];
            try{
                const decodedToken = jwt.verify(token, this.tokenForSign)
                userId = decodedToken.userId
                return userId
            }
            catch (error) {
                return error
            }
           }; 
    }
};