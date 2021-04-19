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
        const { rows } = await pool.query(`
        INSERT INTO posts (user_name, caption, photo_url, tags) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`, [userName, caption, photoUrl, tags])
        return new Post(rows[0]);
    }
    static async findAll() {
        const { rows } = await pool.query(`SELECT * FROM posts`)
        return rows.map(row => new Post(row))
    }
    static async findById(userName) {
        const { rows } = await pool.query(`
        SELECT * FROM posts
        INNER JOIN users
        ON posts.user_name = users.github_username
        WHERE user_name=$1`, [userName])
        return rows.map(row => new Post(row))
    }
    static async updateCaption(id, caption, userName) {
        const { rows } = await pool.query(`
        UPDATE posts
        SET caption=$1
        WHERE post_id=$2 AND user_name=$3
        RETURNING *`, [caption, id, userName])
        return new Post(rows[0]);
    }
    static async delete(id, userName) {
        const { rows } = await pool.query(`
        DELETE FROM posts
        WHERE post_id=$1 AND user_name=$2 RETURNING *`, [id, userName])
        return new Post(rows[0]);
    }
    static async findPopular() {

        const { rows } = await pool.query(`
        SELECT 
            COUNT(*),
            posts.post_id,
            posts.caption,
            posts.photo_url
        FROM posts
        INNER JOIN comments
        ON posts.post_id = comments.post_id
        GROUP BY posts.post_id
        ORDER BY COUNT(*) DESC
        LIMIT 10`)

        return rows.map(row => {
            return {
                count: row.count,
                postId: row.post_id,
                postCaption: row.caption,
                post: row.photo_url
            }
        })
    }
}