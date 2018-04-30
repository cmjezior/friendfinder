// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information (info in the data folder: friends.js)

var friendsData = require("../data/friends");
var path = require("path");

// ROUTING
module.exports = function(app) {

  // API GET Requests
  // Below code handles when users "visit" a page.
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST: setting the post for the api/friends route
  // Below code handles when a user submits a form and thus submits data to the server.
  // When a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out the form... this data is then sent to the server...
  // Then the server saves the data to the friends array)
  app.post("/api/friends", function(req, res) {
    //variables needed for the post
    var match = {
			name: "",
			image: "",
			matchDifference: 100
  };
    var userData = req.body;
    var userName = userData.name;
    var userImage = userData.image;
    var userScores = userData.scores;

    var totalDifference;

  //loop through the friends array to get each friends scores
  for(var i = 0; i < friends.length; i++){
      var currentFriend = friends[i];
			totalDifference = 0;
      console.log(friends[i].name);
 //loop through the scores
    for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];
    			console.log(currentFriend.scores[j]);

      totalDifference += Math.abs(parseInt(userScores) - parseInt(currentFriendScore));
  };
  // If totalDifference is less then the differences of the current "match"
				if (totalDifference <= match.matchDifference){
          match.name = currentFriend.name;
        match.photo = currentFriend.photo;
        match.matchDifference = totalDifference;
      }
    }
  friends.push(userData);
  res.json(match);
  };
  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friends = [];

    console.log(friends);
  });
};
