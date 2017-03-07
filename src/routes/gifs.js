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
        res.json(gifs);
      }
    });
  });
  router.route('/gif/:giphy_id')
  .delete(function(req, res, next){
    Gif.remove({_id: req.params.giphy_id}, function(err, gif){
      if(err){
        return next(err);
      } else {
        res.json({title: 'gif was successfully deleted!'});
      }
    });
  });

module.exports = router;
