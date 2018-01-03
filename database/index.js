const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("We've connected to MongoDB!")
});

let repoSchema = mongoose.Schema({
  repoID: Number,
  reponame: String,
  username: String,
  created_at: Date

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoID, reponame, username, created_at) => {
  let repo = new Repo({repoID: repoID, reponame: reponame, username: username, created_at: created_at});
  repo.save((err) => {
    if (err) {
      console.log(`error saving record: ${reponame}, ${username}`)
    }
  })
}

let search = () => {
  var query = Repo.find({}).
  limit(25).
  sort({forks: -1}).
  select({repoID: 1, reponame: 1, username: 1, created_at: 1});
  return query;
}

module.exports.save = save;
module.exports.search = search;