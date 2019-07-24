const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection ERROR:'));
db.once('open', () => {console.log('db CONNECTED!')});

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  name: String, // name of repo
  owner: String, // username
  html_url: {type: String, unique: true}, // url of repo
  updated_at: Date, // or String?
  contributors_url: String // repoURL/contributers
});
repoSchema.path('html_url').index({unique: true});

let Repo = mongoose.model('Repo', repoSchema);

let save = (username, url, name, updated, contributors) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var user = new Repo({
    name: name, // name of repo
    owner: username, // username
    html_url: url,
    updated_at: updated, // or String?
    contributors_url: contributors
  });

  return user.save((err, res) => {
    if (err) {
      console.log('error from SAVE fn', err);
    } else {
      return res;
    }
  });
};

module.exports.save = save;