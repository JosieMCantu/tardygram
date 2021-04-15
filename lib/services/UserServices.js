const { getToken, getUserProfile } = require('../utils/github');
const User = require('../models/User');

module.exports = class UserService {

    static async create(code) {

        const token = await getToken(code);

        const userProfile = await getUserProfile(token);
        console.log(userProfile)
 
        const userName = userProfile.username
        //check if there is already a user with that username in the database
        const existingUser = await User.findByUsername(userName);
        //if user does not exist, insert user into database, if they do exist, check if the avatar has changed, if so, update avatar
        if(!existingUser){
            const response = await User.insert(userProfile);
            return response;
        } else {
            if(userProfile.photo !== existingUser.avatar){
                const response = await User.updateAvatar(userProfile);
                return response
            } else {
                return 'User up to date!'
            }
        }
        //take userProfile object and pass to User class insert method to insert into database
        //return database response to controller
    } 
}