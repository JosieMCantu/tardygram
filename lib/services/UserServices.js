const { json } = require('express');
const { getToken, getUserProfile } = require('../utils/github');


module.exports = class User {
    static async create(code) {
        const token = await getToken(code);
        const userProfile = await getUserProfile(token);
        console.log(userProfile);
        //return username and avatar    
        //setup database
    }

    
}