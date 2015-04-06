
var express = require('express');
var Twitter = require('twitter');
var cors = require('cors');

var twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});


var app = module.exports = express.createServer();

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
  twitter.get("search/tweets", {q: 'football'}, function(error, data, response){
    var results = [];
    var tweets = data["statuses"];
    for(var i = 0; i < 2; i+=1){
      var element = tweets[i];
      var msg = element["text"]
      var user = element["user"]["name"];
      results.push({"message":msg, "user":user});
    };
    res.json({"tweets":results});
  });
});


app.listen((process.env.PORT || 5000), function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
