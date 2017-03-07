let mongoose = require('mongoose');

let GifSchema = new mongoose.Schema({
  keyword: String,
  url: String,
  description: String
});

module.exports = mongoose.model('Gif', GifSchema);
