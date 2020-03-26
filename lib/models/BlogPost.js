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

schema.statics.longestPosts = function() {
  return this.
    aggregate([
      {
        '$project': {
          '_id': true, 
          'author': true, 
          'text': true, 
          'textLength': {
            '$strLenCP': '$text'
          }
        }
      }, {
        '$sort': {
          'textLength': -1
        }
      }, {
        '$limit': 10
      }
    ]);
};

schema.statics.mostCommented = function(num = 10) {
  return this.aggregate([
    {
      '$lookup': {
        'from': 'comments', 
        'localField': '_id', 
        'foreignField': 'blogPostId', 
        'as': 'comments'
      }
    }, {
      '$project': {
        '_id': true, 
        'author': true, 
        'text': true, 
        'totalComments': {
          '$size': '$comments'
        }
      }
    }, {
      '$sort': {
        'totalComments': -1
      }
    }, {
      '$limit': num
    }
  ]);
};

module.exports = mongoose.model('BlogPost', schema);
