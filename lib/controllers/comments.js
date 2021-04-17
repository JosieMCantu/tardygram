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
    .delete('/:id', ensureAuth, async (req, res, next) => {
        try {
            const response = await Comment.delete(req.params.id, req.user.userName)
            res.send(response)
        } catch (error) {
            next(error)
        }
    })