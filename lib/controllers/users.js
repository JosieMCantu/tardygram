const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()

    .get('/popular', async (req, res, next) => {
        try {
            const response = await User.findPopular()
            res.send(response)
        } catch (error) {
            next(error)
        }
    })