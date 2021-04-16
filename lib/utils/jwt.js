const jwt = require('jsonwebtoken');
//takes in a profile and signs the cookie that it's from our site
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