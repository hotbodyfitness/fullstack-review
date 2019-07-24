const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, cb/* TODO */) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, (err, res, body) => {
    if (err) {
      console.log('error from request()', err)
    } else {
      cb(res);
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;