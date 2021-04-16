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
    .get('/', async (req, res, next) => {
        try {
            const response = await Post.findAll()
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get('/:userName', async (req, res, next) => {
        try {
            const response = await Post.findById(req.params.userName)
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .patch('/:id', ensureAuth, async (req, res, next) => {
        try {
            const response = await Post.updateCaption(req.params.id, req.body.caption, req.user.userName)
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
