const { verify } = require('../utils/jwt')

module.exports = (req, res, next) => {
    try {
        // try to pull the session cookie off the request
        const { session } = req.cookies;
        // use verify function to verify cookie and return user object
        const user = verify(session);
        //attach user object to req
        req.user = user;
        // pass to next middleware
        next();
    } catch (error) {
        next(error)
    }
}