const express = require('express');
const app = express();
app.use(express.json());

var MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017/';
const DB_NAME = 'test';

// Accepts a group settings object and generates a new group which is added to the database.
function createNewGroup(groupOpts) {
  let gId = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 5; i++) {
    gId += characters.charAt(Math.floor(Math.random() * 5));
  }
  groupOpts['_id'] = gId;
  MongoClient.connect(URL, (err, db) => {
    if (err) throw err;
    let dbo = db.db(DB_NAME);
    dbo.collection('groups').insertOne(groupOpts, (err, res) => {
      if (err) throw err;
    });
  });
  return gId;
}

function addToGroup(user, groupId) {
  if (groupId) {
    user['groupId'] = groupId;
  }
  MongoClient.connect(URL, (err, db) => {
    if (err) throw err;
    let dbo = db.db(DB_NAME);
    dbo.collection('users').insertOne(user, (err, res) => {
      if (err) throw err;
      console.log(res);
    });
  });
}

function removeFromGroup(user) {
  const query = {_id: user._id};
  MongoClient.connect(URL, (err, res) => {
    if (err) throw err;
    let dbo = db.db(DB_NAME);
    dbo.collection('users').deleteOne(query, (err, res) => {
      if (err) throw err;
      console.log(res);
    });
  });
}

function canJoinGroup(groupId, callback) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, function (err, db) {
      if (err) throw err;
      var dbo = db.db(DB_NAME);
      const query = {_id: groupId};
      dbo.collection('groups').findOne(query, function (err, result) {
        if (err) throw err;
        resolve(result);
        db.close();
      });
    });
  });
}

const port = process.env.port || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/tigerhacks/createGroup', (req, res) => {
  const newGroup = req.body;
  let groupId = createNewGroup(newGroup.groupOpts);
  res.send({
    error: false,
    message: 'Success. Sending group id.',
    groupId: groupId,
  });
});

app.post('/tigerhacks/canJoinGroup', (req, res) => {
  const groupId = req.body;
  canJoinGroup(groupId).then(result => {
    result
      ? res.send({error: false, message: 'Success. Can join group'})
      : res.send({error: true, message: 'Group does not exist.'});
  });
});

app.post('/tigerhacks/userJoinGroup', (req, res) => {
  const user = req.body;
  addToGroup(user.name, user.groupId);
  res.send({error: false, message: 'Success. User added to group.'});
});
