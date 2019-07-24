const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection ERROR:'));
db.once('open', () => {console.log('db CONNECTED!')});

let repoSchema = /* new */ mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  full_name: String,
  owner: {
    login: String,
    id: Number,
    url: String,
    repos_url: String
  },
  html_url: String,
  url: String,
  created_at: Date, // or String?
  updated_at: Date, // or String?
  pushed_at: Date // or String?
});

let Repo = mongoose.model('Repo', repoSchema);

// console.log('user.name from schema', user.name);

let save = (username/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var user = new Repo({ name: username });
  return user.save((err, res) => {
    if (err) {
      console.log('error from SAVE fn', err);
    } else {
      return res;
    }
  });
};

module.exports.save = save;