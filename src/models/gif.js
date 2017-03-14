let mongoose = require('mongoose');

let GifSchema = new mongoose.Schema({
  keyword: String,
  url: String,
  description: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Gif', GifSchema);
