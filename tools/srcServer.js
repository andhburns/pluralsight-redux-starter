import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import uriUtil from 'mongodb-uri';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/gif';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(mongooseUri, options);
const Gif = require('../src/models/gif');
const gifRoutes = require('../src/routes/gifs');

/* eslint-disable no-console */


const port = 3000;
const app = express();
const router = express.Router();
const compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//This change caused the browser to output html to the user because gifs.js sets
//the content type to json and that cascaded down to the homepage route below (line 44).
app.use('/', gifRoutes);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  //the gifRoutes module was setting the Content-Type to json. Added res.setHeader
  // below and changed Content-Type to text/html.
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
