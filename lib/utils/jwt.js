const jwt = require('jsonwebtoken');

const sign = (userProfile) => {
    return jwt.sign({...userProfile}, process.env.APP_SECRET, {
        expiresIn: '24hrs',
    });
};

const verify = (webToken) => {
    return jwt.verify(webToken, process.env.APP_SECRET);
}



module.exports = {
    sign,
    verify
}