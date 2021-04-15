const { Router } = require('express');
const UserService = require('../services/UserServices');
const User = require('../services/UserServices');

module.exports = Router()

.get('/login', async (req, res, next) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user`)
})
.get('/login/callback', async (req, res, next) => {
    try {
        const code = req.query.code
        const profile = await UserService.create(code);
        res.send(profile)
    } catch (error) {
        next(error)
    }
})