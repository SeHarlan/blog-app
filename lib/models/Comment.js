const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  blogPostId: {
    ref: 'BlogPost',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Comment', schema)
;
