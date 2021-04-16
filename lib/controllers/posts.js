const { Router } = require('express');
const Post = require('../models/Post');
const ensureAuth = require('../middleware/ensureAuth')

module.exports = Router()

    .post('/', ensureAuth, async (req, res, next) => {
        try {
            const response = await Post.insert({
                userName: req.user.username,
                ...req.body
            })
            res.send(response)
        } catch (error) {
            next(error)
        }

    })