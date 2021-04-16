const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  jest.mock('../lib/middleware/ensureAuth.js', () => (req, res,next) => {
    req.user = {userName: 'testUser', avatar: 'http://www.me.com'}
    next()
  })

const testUser = { 
          userName: 'testUser', 
          caption: 'whatever', 
          photo_url: 'http:www.me.com', 
          tags: ['nice', 'this', 'that']
        }
        

  it('POST should post a new post to the posts database', async () => {
    const response = await request(app)
    .post('/api/v1/auth/posts')
    .send({ 
      userName: 'testUser', 
      caption: 'whatever', 
      photo_url: 'http:www.me.com', 
      tags: ['nice', 'this', 'that']})

      const expectation = {
        id: 1,
        ...testUser}

    expect(response.body).toEqual(expectation)
  })
});
