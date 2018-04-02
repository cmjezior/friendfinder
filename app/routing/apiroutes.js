// Dependencies
// =============================================================
var path = require("path");
var friends = require("../data/friends.js")

// // Sets up the Express App
// // =============================================================
// var app = express();
// var PORT = 3000;
//
// // Sets up the Express app to handle data parsing
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// A GET route to display a JSON of all possible friends
// =============================================================
app.get("/api/friends", function(req, res) {
  res.json(friends);
});

// A POST route, used to handle incoming survey results. This route will also be used to handle the compatibility logic.
app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newMember = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newMember.name = newMember.name.replace(/\s+/g, "").toLowerCase();

  newMember.photo = newMember.photo.replace(/\s+/g, "").toLowerCase();


  toInteger(newMember.scores);

  var nemesisName = "";
  var nemesisPhoto = "";
  var totalDifference = 0;

  for (var i = 0; i < friends.length; i++) {
    var diff = 0;
    for (var j = 0; j < friends[i].scores.length; j++) {
        diff += Math.abs(friends[i].scores[j] - newMember.scores[j]);
    }
    if diff > totalDifference) {
        totalDifference = diff;
        nemesisName = friends[i].name;
        nemesisPhoto = friends[i].photo;
    }
  }

  friends.push(newMember);

  res.json({
    status: "ok"
    nemesisName: nemesisName,
    nemesisPhoto: nemesisPhoto
  });

});

function toInteger(newMember) {
  for (var i = 0; i < newMember.length; i++) {
    surveyResults[i] = parseInt(newMember[i]);
  }
}
