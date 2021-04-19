const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const seed = require('../lib/utils/seed');

jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
  req.user = { userName: 'testUser', avatar: 'http://www.me.com' };
  next();
});

describe('Posts routes tests', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    await User.insert({
      username: 'testUser',
      photo: 'http:www.me.com'
    })
  })

  const testPost = {
    userName: 'testUser',
    caption: 'whatever',
    photoUrl: 'http:www.me.com',
    tags: ['nice', 'this', 'that']
  }


  it('POST should post a new post to the posts database', async () => {
    const response = await request(app)
      .post('/api/v1/post')
      .send({
        ...testPost
      })

    const expectation = {
      postId: '1',
      ...testPost
    }

    expect(response.body).toEqual(expectation)
  })

  it('GET should get all posts in the database', async () => {
    await request(app)
      .post('/api/v1/post')
      .send({
        ...testPost
      })
    const response = await request(app)
      .get('/api/v1/post')

    const expectation = {
      postId: '1',
      ...testPost
    }
    expect(response.body).toEqual([expectation])
  })

  it('GET all posts by id', async () => {
    await request(app)
      .post('/api/v1/post')
      .send({
        ...testPost
      })
    const response = await request(app)
      .get('/api/v1/post/testUser')

    const expectation = {
      postId: '1',
      ...testPost
    }
    expect(response.body).toEqual([expectation])
  })

  it('PATCH updates the caption of a post by one user', async () => {
    await request(app)
      .post('/api/v1/post')
      .send({
        ...testPost
      })
    const response = await request(app)
      .patch('/api/v1/post/1')
      .send({ caption: 'testing new caption' })

    const expectation = {
      postId: '1',
      userName: 'testUser',
      caption: 'testing new caption',
      photoUrl: 'http:www.me.com',
      tags: ['nice', 'this', 'that']
    }
    expect(response.body).toEqual(expectation)
  })

  it('DELETE should remove a post from one user', async () => {
    await request(app)
      .post('/api/v1/post')
      .send({
        ...testPost
      })
    const response = await request(app)
      .delete('/api/v1/post/1')

    const expectation = {
      postId: '1',
      userName: 'testUser',
      caption: 'whatever',
      photoUrl: 'http:www.me.com',
      tags: ['nice', 'this', 'that']
    }
    expect(response.body).toEqual(expectation)
  })

  it('GET the most popular post', async () => {
    await seed();

    const response = await request(app)
      .get('/api/v1/post/popular')

    const expectation = [
        { "count": "4", "post": "www.images.com/cave", "postCaption": "A picture of me in a house with a rock", "postId": "1" }, 
        { "count": "3", "post": "www.images.com/broom", "postCaption": "A picture of me on a boat with a broom", "postId": "2" }, 
        { "count": "2", "post": "www.images.com/sock", "postCaption": "A picture of a sock", "postId": "10" }, 
        { "count": "1", "post": "www.images.com/bear", "postCaption": "A picture of me in the woods with a bear", "postId": "4" }, 
        { "count": "1", "post": "www.images.com/lizard", "postCaption": "A picture of me in a room with a lizard", "postId": "5" }, 
        { "count": "1", "post": "www.images.com/night", "postCaption": "Me out and about with my girlies", "postId": "7" }]
    expect(response.body).toEqual(expectation)
  })
});


describe('Comments routes tests', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    await User.insert({
      username: 'testUser',
      photo: 'http:www.me.com'
    })
  })

  const testComment = {
    commentBy: 'testUser',
    postId: '1',
    comment: 'another whatever'
  }

  it('POST should create a new comment in th comments database', async () => {
    await Post.insert({
      userName: 'testUser',
      caption: "A picture of me in a house with a rock",
      photoUrl: "www.images.com/cave",
      tags: ['house life', 'bhouseats', 'rock']
    });

    const response = await request(app)
      .post('/api/v1/comments')
      .send({ ...testComment })

    const expectation = {
      commentId: '1',
      ...testComment
    }
    expect(response.body).toEqual(expectation)

  })

  it('DELETE should remove a comment', async () => {
    await Post.insert({
      userName: 'testUser',
      caption: "A picture of me in a house with a rock",
      photoUrl: "www.images.com/cave",
      tags: ['house life', 'bhouseats', 'rock']
    });
    await request(app)
      .post('/api/v1/comments')
      .send({
        ...testComment
      })
    const response = await request(app)
      .delete('/api/v1/comments/1')

    const expectation = {
      commentId: '1',
      ...testComment
    }
    expect(response.body).toEqual(expectation)
  })

});
