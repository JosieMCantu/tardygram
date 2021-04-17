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

    static async insert() {
        const { rows } = await pool.query(`
    INSERT INTO comments (comment_by, comment_id, post_id, comment) VALUES ($1, $2, $3, $4) RETURNING *`, )
    }

}