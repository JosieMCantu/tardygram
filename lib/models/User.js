const pool = require('../utils/pool')

module.exports = class User {

    userName;
    avatar;
    //constructor takes ugly names from database return and makes them nice
    constructor(row) {
        this.userName = row.github_username,
        this.avatar = row.github_photo
    }
    // takes userProfile object, destructures username and photo, and inserts them into database as github_username and github_photo
    static async insert({username, photo}) {
        const { rows } = await pool.query(`
            INSERT into users (github_username, github_photo)
            VALUES ($1, $2)
            RETURNING *`, [username, photo]);

        console.log(rows);
    // returns a new instance of User class with nice names
        return new User(rows[0]);
    }
    // a method that finds user info by username
    static async findByUsername(username) {
        const { rows } = await pool.query(`
            SELECT *
            FROM users
            WHERE github_username = $1`, [username])
        if(rows.length < 1) return null;
        return new User(rows[0]);
    }
    static async updateAvatar({username, photo}) {
        const { rows } = await pool.query(`
            UPDATE users
            SET (github_photo = $1)
            WHERE github_username = $2
            RETURNING * `, [photo, username])
        return new User(rows[0]);
    }
}