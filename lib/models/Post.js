const pool = require('../utils/pool');


module.exports = class Post {
    postId;
    userName;
    caption;
    photoUrl;
    tags;

    constructor(rows) {
        this.postId = rows.post_id,
            this.userName = rows.user_name,
            this.caption = rows.caption,
            this.photoUrl = rows.photo_url,
            this.tags = rows.tags
    }

    static async insert({ userName, caption, photoUrl, tags }) {
        const { rows } = await pool.query(`INSERT INTO posts (user_name, caption, photo_url, tags) VALUES ($1, $2, $3, $4) RETURNING *`, [userName, caption, photoUrl, tags])
        return new Post(rows[0]);
    }
    static async findAll() {
        const { rows } = await pool.query(`SELECT * FROM posts`)
        return rows.map(row => new Post(row))
    }

}