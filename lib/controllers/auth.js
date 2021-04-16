const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const UserService = require('../services/UserServices');
const DAY_IN_MS = 1000 * 60 * 60 * 24;
const { sign } = require('../utils/jwt');


module.exports = Router()
.get('/login', async (req, res, next) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user`)
})
.get('/login/callback', async (req, res, next) => {
    try {
        //grab code from URL sent by github
        const code = req.query.code;
        //take code get user profile object
        const profile = await UserService.create(code);
        //create a cookie attach to RESponse
        res.cookie('session', sign(profile), {
            httpOnly: true,
            sameSite: "strict",
            maxAge: DAY_IN_MS,
        });
        //redirect to home page
        res.redirect('/')

    } catch (error) {

        next(error);
    }
})
//immediately on load, FE sends GET request to /verify to verify cookie and user
.get('/verify', ensureAuth , (req, res, next) => {
    res.send(req.user);
})