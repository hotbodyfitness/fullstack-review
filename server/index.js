const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let getReposByUsername = require('../helpers/github.js').getReposByUsername;
let save = require('../database/index.js').save;
let Repo = require('../database/index.js').Repo;

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
      save(username, repo.html_url, repo.name, repo.updated_at, repo.contributors_url)
        .then((result) => {
          res.redirect('/repos');
          // res.end('Successful search');
        });
    });
  });

});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  Repo.find().sort({ updated_at: -1 }).limit(25).then((results) => {
    Repo.count().then((count) => {
      var obj = {results, count};
      res.send(obj);
    })
  });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

