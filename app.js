
var express = require('express');
var twitter = require('twitter');
var cors = require('cors');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(cors());
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req,res){
  res.send("use '/tweets/:hashtag'");
});

app.get('/tweets/:hashtag', function(req, res) {
  var hashtag = req.param('hashtag');
  console.log("GET /tweets/" + hashtag);
  var response = {};
  response["tweets"] = getTweets(hashtag);
  res.json(response);
});

function getTweets(hashtag){
  var tweets = [];
  if(hashtag == "yolo"){
    var tweet = {"message":"yooooolo"};
  }else{
    var tweet = {"message":"Some message."};  
  }
  tweets.push(tweet);
  tweets.push({"message":"tweeeet"});
  return tweets;
}

app.listen((process.env.PORT || 5000), function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
