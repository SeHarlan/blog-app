require('dotenv').config();
require('./lib/utils/connect')();

const seedData = require('./db/seed');

seedData({ blogPostsToCreate: 30, commentsToCreate: 300 })
  .then(() => console.log('done'));
