import express from 'express';
let router = express.Router();
let Gif = require('../models/gif');


router.use(function(req, res, next){
  // console.log('something is happening!');
  res.setHeader('Content-Type', 'application/json');
  next();
});


router.route('/gif')
  .post(function(req, res){

    let gif = new Gif();

    gif.keyword = req.body.keyword;
    gif.url = req.body.url;
    gif.description = req.body.description;
    // todo.blah = req.body.blah;
    // console.log(req.body);

    gif.save(function(err, gif){
      if(err){
        res.send(err);
      } else {
        res.json(gif);
      }
    });
  })
  .get(function(req, res, next){
    Gif.find({}, function(err, gifs){
      if(err){
        return next(err);
      } else {
        // console.log(gifs);
        //This line controls what you send back to the client (web browser)
        res.json(gifs);
      }
    });
  })
  .delete(function(req, res, next){
    Gif.remove({url: req.body.url}, function(err, gif){
      if(err){
        return next(err);
      } else {
        res.json({title: 'gif was successfully deleted!'});
      }
    });
  });

module.exports = router;
