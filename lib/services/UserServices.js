const { getToken, getUserProfile } = require('../utils/github');
const User = require('../models/User');

module.exports = class UserService {

    static async create(code) {
        // take code from github and exchange for token
        const token = await getToken(code);
        // send token to github in exchange for profile info
        const userProfile = await getUserProfile(token);
        //pull username off user info
        const userName = userProfile.username
        //check if there is already a user with that username in the database
        const existingUser = await User.findByUsername(userName);
        //if user does not exist, insert user into database, if they do exist, check if the avatar has changed, if so, update avatar
        if(!existingUser){
            //take userProfile object and pass to User class insert method to insert into database
            const response = await User.insert(userProfile);
            //return database response to controller
            return response;
        } else {
            // if there is already this user in the database, return existing user
            return existingUser;
        }
    } 
}