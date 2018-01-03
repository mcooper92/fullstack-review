const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {

  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    let jsonBody = JSON.parse(body);
    //console.log(jsonBody);
    callback(jsonBody);
  })
}

module.exports.getReposByUsername = getReposByUsername;