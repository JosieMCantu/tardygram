const { json } = require('express');
const fetch = require('node-fetch');

module.exports = class User {
    static async create(code) {
        return fetch(`https://github.com/login/oauth/access_token`, {
        method: 'Post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_SECRET,
            code
        })
        }).then(res => res.json())
        .then(res => res)
    }
}