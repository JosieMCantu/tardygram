const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
  req.user = { userName: 'testUser', avatar: 'http://www.me.com' };
  next();
});

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    await User.insert({
      username: 'testUser',
      photo: 'http:www.me.com'
    })
  })

  const testUser = {
    userName: 'testUser',
    caption: 'whatever',
    photoUrl: 'http:www.me.com',
    tags: ['nice', 'this', 'that']
  }


  it('POST should post a new post to the posts database', async () => {
    const response = await request(app)
      .post('/api/v1/post')
      .send({
        ...testUser
      })

    const expectation = {
      postId: '1',
      ...testUser
    }

    expect(response.body).toEqual(expectation)
  })

  it('GET should get all posts in the database', async () => {
    await request(app)
      .post('/api/v1/post')
      .send({
        ...testUser
      })
    const response = await request(app)
      .get('/api/v1/post')

    const expectation = {
      postId: '1',
      ...testUser
    }
    expect(response.body).toEqual([expectation])
  })
});
