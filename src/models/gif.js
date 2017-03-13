let mongoose = require('mongoose');

let GifSchema = new mongoose.Schema({
  keyword: String,
  url: String,
  description: String,
  owner: {
    type: String,
    ref: 'User'
  }
});

module.exports = mongoose.model('Gif', GifSchema);
