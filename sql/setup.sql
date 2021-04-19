DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE users (
    github_username TEXT NOT NULL PRIMARY KEY,
    github_photo TEXT NOT NULL
);

CREATE TABLE posts (
    post_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    user_name TEXT REFERENCES users(github_username),
    caption TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    tags TEXT[]
);

CREATE TABLE comments (
    comment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    comment_by TEXT REFERENCES users(github_username),
    post_id BIGINT REFERENCES posts(post_id),
    comment TEXT NOT NULL
);