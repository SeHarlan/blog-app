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
});


module.exports = mongoose.model('BlogPost', schema);
