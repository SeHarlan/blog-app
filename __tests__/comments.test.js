const { getComment, getBlogPost } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('comment routes', () => {
  it('creates a comment', async() => {
    const blogPost = await getBlogPost();

    return request(app)
      .post('/api/v1/comments')
      .send({
        blogPostId: blogPost._id,
        handle: 'test',
        text: 'test 1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          blogPostId: blogPost._id,
          handle: 'test',
          text: 'test 1234',
          __v: 0
        });
      });
  });

  it('gets top commenters', () => {
    return request(app)
      .get('/api/v1/comments/topCommenters')
      .then(res => {
        expect(res.body.length).toEqual(3);
        expect(res.body).toContainEqual(
          {
            _id: expect.any(String),
            count: expect.any(Number)
          }
        );
      });
  });

  it('gets a comment by id', async() => {
    const blogPost = await getBlogPost();
    const comment = await getComment({ blogPostId: blogPost._id });

    return request(app)
      .get(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...comment,
          blogPostId: blogPost
        });
      });
  });

  it('updates a comment by id', async() => {
    const comment = await getComment();

    return request(app)
      .patch(`/api/v1/comments/${comment._id}`)
      .send({ text: 'bad!' })
      .then(res => {
        expect(res.body).toEqual({
          ...comment,
          text: 'bad!'
        });
      });
  });

  it('deletes a comment by id', async() => {
    const comment = await getComment();

    return request(app)
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });

});
