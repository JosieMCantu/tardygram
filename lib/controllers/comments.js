const { Router } = require('express');
const Comment = require('../models/Comment');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()

    .post('/', ensureAuth, async (req, res, next) => {
        try {
            const response = await Comment.insert({
                userName: req.user.username,
                ...req.body
            })
            res.send(response)
        } catch (error) {
            next(error)
        }
    })