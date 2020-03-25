const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'blogPostId'
});

module.exports = mongoose.model('BlogPost', schema);
