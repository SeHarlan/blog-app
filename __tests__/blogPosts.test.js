const { getBlogPost, getBlogPosts, getComments } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('blog Post routes', () => {
  it('creates a blog Post', () => {
    return request(app)
      .post('/api/v1/blogPosts')
      .send({
        author: 'test',
        text: 'test 1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          author: 'test',
          text: 'test 1234',
          __v: 0
        });
      });
  });

  it('gets a blog Post by id', async() => {
    const blogPost = await getBlogPost();
    const comments = await getComments({ blogPostId: blogPost._id });

    return request(app)
      .get(`/api/v1/blogPosts/${blogPost._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...blogPost,
          comments 
        });
      });
  });

  it('gets all blog posts', async() => {
    const blogPosts = await getBlogPosts();

    return request(app)
      .get('/api/v1/blogPosts')
      .then(res => {
        expect(res.body).toEqual(blogPosts);
      });
  });

  it('updates a blog Post by id', async() => {
    const blogPost = await getBlogPost();

    return request(app)
      .patch(`/api/v1/blogPosts/${blogPost._id}`)
      .send({ text: '1234 test' })
      .then(res => {
        expect(res.body).toEqual({
          ...blogPost,
          text: '1234 test'
        });
      });
  });

  it('deletes a blog Post by id', async() => {
    const blogPost = await getBlogPost();
    
    return request(app)
      .delete(`/api/v1/blogPosts/${blogPost._id}`)
      .then(res => {
        expect(res.body).toEqual(blogPost);
      });
  });
});
