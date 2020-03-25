const { Router } = require('express');
const BlogPost = require('../models/BlogPost');

module.exports = Router()
  .post('/', (req, res, next) => {
    BlogPost
      .create(req.body)
      .then(BlogPost => res.send(BlogPost))
      .catch(next);
  })

// .get('/most-commented', (req, res, next) => {
//   BlogPost
//     .mostCommented()
//     .then(mostCommented => res.send(mostCommented))
//     .catch(next);
// })

  .get('/:id', (req, res, next) => {
    BlogPost
      .findById(req.params.id)
      .populate('comments')
      .then(BlogPost => res.send(BlogPost))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    BlogPost
      .find()
      .then(BlogPosts => res.send(BlogPosts))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    BlogPost
      .findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
      .then(BlogPost => res.send(BlogPost))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    BlogPost
      .findByIdAndDelete(req.params.id)
      .then(BlogPost => res.send(BlogPost))
      .catch(next);
  });
