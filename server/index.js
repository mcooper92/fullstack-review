var bodyParser = require("body-parser");
const express = require('express');
let app = express();
var helper = require('../helpers/github.js')
var mongo = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  //console.log('TEST ',req.body.username)
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helper.getReposByUsername(req.body.username, function(response, err) {
    if (err){
      res.sendStatus(404)
    }
    
    response.forEach((item, index) => {
      //console.log('TEST', item.created_at)
      mongo.save(item.id, item.name, item.owner.login, item.created_at);
    });
    //send back total new records added
    res.status(201).send(JSON.stringify(response.length));
  })
});


app.get('/repos', function (req, res) {
  var reposData = mongo.search();
  reposData.exec(function(err, repos) {
    if (err) {
      return console.log(err);
    }
    res.status(200).send(repos);
  });
});



let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

