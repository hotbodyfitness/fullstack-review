const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let getReposByUsername = require('../helpers/github.js').getReposByUsername;
let save = require('../database/index.js').save;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = Object.keys(req.body)[0];

  getReposByUsername(username, (response) => {
    var body = JSON.parse(response.body);
    body.forEach((repo) => {
      save(username, repo.html_url, repo.name, repo.updated_at, repo.contributors_url).then((result) => {
        console.log('result from .save() promise:', result)
      });
    });
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

