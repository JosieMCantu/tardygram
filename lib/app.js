const express = require('express');
const app = express();

// allows us to serve static files as FE from BE
app.use(express.static(`${__dirname}/../public`));
//allows us to see cookies on request from FE
app.use(require('cookie-parser')());

app.use(express.json());

app.use('/api/v1/auth', require('./controllers/auth'));
app.use('/api/v1/post', require('./controllers/posts'));
app.use('/api/v1/comments', require('./controllers/comments'));
app.use('/api/v1/users', require('./controllers/users'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
