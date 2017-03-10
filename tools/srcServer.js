import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import uriUtil from 'mongodb-uri';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import configAuth from './configAuth'; // get our config file
import hash from 'password-hash';


mongoose.Promise = global.Promise;

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/gif';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);


const morgan = require('morgan');

const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User   = require('../src/models/user'); // get our mongoose model


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

app.set('superSecret', configAuth.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(morgan('dev'));

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

//api routes ///// ////// ///////

let apiRoutes = express.Router();

// todo: route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (!hash.verify(req.body.password, user.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        let token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

apiRoutes.post('/user', function(req, res) {
  let user = new User();

  user.name = req.body.name;
  user.password = hash.generate(req.body.password);
  user.admin = req.body.admin;

  user.save(function(err, user){
    if(err){
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

app.use('/api', apiRoutes);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
