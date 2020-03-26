const BlogPost = require('../lib/models/BlogPost');
const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();

module.exports = async({ blogPostsToCreate = 10, commentsToCreate = 100 } = {}) => {
  const handles = ['J.R.R. Tolkien', 'Frank Herbert', 'Isaac Asimov'];
  const blogPost = await BlogPost.create([...Array(blogPostsToCreate)].map(() => ({
    author: chance.pickone(handles),
    text: chance.paragraph()
  })));

  

  await Comment.create([...Array(commentsToCreate)].map(() => {
    return {
      blogPostId: chance.pickone(blogPost)._id,
      handle: chance.pickone(handles),
      text: chance.sentence()
    };
  }));
};
