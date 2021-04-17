const pool = require('../utils/pool')

module.exports = class Comment {
    commentId;
    commentBy;
    postId;
    comment;

    constructor(rows) {
        this.commentId = rows.comment_id,
            this.commentBy = rows.comment_by,
            this.postId = rows.post_id,
            this.comment = rows.comment
    }

    static async insert({ commentBy, postId, comment }) {
        const { rows } = await pool.query(`
    INSERT INTO comments (comment_by, post_id, comment) 
    VALUES ($1, $2, $3) 
    RETURNING *`, [commentBy, postId, comment])
        return new Comment(rows[0])
    }
    static async delete(commentId, commentBy) {
        const { rows } = await pool.query(`
        DELETE FROM comments WHERE comment_id=$1 AND comment_by=$2 RETURNING *`, [commentId, commentBy])
        return new Comment(rows[0])
    }

}