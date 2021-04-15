const { json } = require('express');
const getToken = require('../utils/github');


module.exports = class User {
    static async create(code) {
        const token = await getToken(code);
        //Use the token to make a call to github to get user profile
        //return username and avatar
        //setup database
    }
}