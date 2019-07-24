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
  console.log('username:', username);

  getReposByUsername(username, () => {
    console.log('res received');
    save(username).then((res) => {
      console.log('result from .save() promise:', res)
    });
  });
  // console.log('result:', result);


  // console.log('save(username)', save(username));

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

