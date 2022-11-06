var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var classifyPoint = require('robust-point-in-polygon');
const URL = 'mongodb://localhost:27017/';
const DB_NAME = 'test';

function wipeMongo() {
  MongoClient.connect(URL, (err, db) => {
    if (err) throw err;
    let dbo = db.db(DB_NAME);
    dbo.collection('groups').remove({}, (err, res) => {
      if (err) throw err;
    });
    dbo.collection('users').remove({}, (err, res) => {
      if (err) throw err;
    });
  });
}

// Accepts a group settings object and generates a new group which is added to the database.
// Returns the group id
function createNewGroup(groupOpts) {
  let gId = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 5; i++) {
    gId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  groupOpts['_id'] = gId;
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo.collection('groups').insertOne(groupOpts, (err, res) => {
        if (err) throw err;
        resolve(gId);
        db.close();
      });
    });
  });
}

// @user : {name: String, groupId: String}
// Accepts a user object containing the user's name and the user's group id.
// Returns {user: {_id, name, groupId, lkLoc, isOutside}, group: {name, area, _id}}
function addToGroup(user) {
  user.lkLoc = null;
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo.collection('users').insertOne(user, (err, res) => {
        let responseData = {};
        if (err) throw err;
        dbo.collection('users').findOne({_id: res.insertedId}, (err, res) => {
          if (err) throw err;
          responseData.user = res;
          dbo.collection('groups').findOne({_id: user.groupId}, (err, res) => {
            if (err) throw err;
            responseData.group = res;
            resolve(responseData); // @responseData : {user: {_id, name, groupId, lkLoc, isOutside}, group: {name, area, _id}}
          });
        });
      });
    });
  });
}

// Returns T/F based on if the groupId exists and is joinable.
function canJoinGroup(groupId) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, function (err, db) {
      if (err) throw err;
      var dbo = db.db(DB_NAME);
      const query = {_id: groupId};
      dbo.collection('groups').findOne(query, function (err, res) {
        if (err) throw err;
        resolve(res);
        db.close();
      });
    });
  });
}

function removeFromGroup(user) {
  const query = {_id: user.id};
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo.collection('users').deleteOne(query, (err, res) => {
        if (err) throw err;
        resolve(res);
      });
    });
  });
}

function findById(userId) {
  const query = {_id: new ObjectId(userId)};
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo.collection('users').findOne(query, (err, res) => {
        if (err) throw err;
        resolve(res);
      });
    });
  });
}

// Helper function
function isPointOutside(area, lkLoc) {
  const arrPts = area.map(point => {
    return [point.latitude, point.longitude];
  });
  return classifyPoint(arrPts, [lkLoc.latitude, lkLoc.longitude]) === 1
    ? true
    : false;
}

// Accepts a full user object and an area.
// Updates user location and determines if user is outside of geofence.
function updateLocation(user, area) {
  console.log(`Updating location ${user.name}`);
  const query = {_id: new ObjectId(user.id)};
  const curLoc = {
    latitude: user.lkLoc.latitude,
    longitude: user.lkLoc.longitude,
  };
  const update = {
    $set: {
      lkLoc: curLoc,
    },
  };
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo.collection('users').updateOne(query, update, (err, res) => {
        //console.log('res ' + JSON.stringify(res));
        if (err) throw err;
        dbo.collection('events').findOne(query, (err, res) => {
          console.log(res);
          let outside = isPointOutside(area, curLoc);
          if (res) {
            if (!outside) {
              console.log('im finna delete');
              dbo.collection('events').findOneAndDelete(query).then(() => resolve());
            } else {
              resolve();
            }
          } else {
            console.log('event not found');
            if (outside) {
              dbo.collection('events').insertOne(
                {
                  _id: new ObjectId(user.id),
                  name: user.name,
                  sentTo: [new ObjectId(user.id)],
                  groupId: user.groupId,
                },
                (err, res) => {
                  resolve();
                },
              );
            } else {
              resolve();
            }
          }
        });
      });
    });
  });
}

// Accepts a userId and a groupId
// Searches for notification events that need to be sent to the client
// Returns an array of names that must be sent out.
function checkEvents(userId, groupId) {
  let notis = [];
  console.log('check events');
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo.collection('events').find({groupId: groupId}).toArray((err, result) => {
        console.log(err, result);
        for(let i=0; i<result.length; i++){
          if(!result[i].sentTo.map(id => id.toString()).includes(userId) && userId !== result[i]._id.toString()){
            notis.push(result[i].name);
            updateSentTo(result[i]._id, [...result[i].sentTo, new ObjectId(userId)])
            .then(() => {
              if(i === result.length-1) resolve(notis);
            })
          }else{
            resolve(notis);
          }
        }
        if(result.length === 0) resolve(notis);
      });
    });
  });
}

function updateSentTo(eventId, newSentTo) {
  console.log('Update sent to');
  const update = {
    $set: {
      sentTo: newSentTo,
    },
  };
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo
        .collection('events')
        .updateOne({_id: eventId}, update, (err, res) => {
          console.log(res);
          if (err) throw err;
          db.close();
          resolve();
        });
    });
  });
}

function getGroupLocations(groupId, userId) {
  // user id coming from client so needs to become object
  const query = {
    groupId: groupId,
    _id: {$ne: new ObjectId(userId)},
  };
  return new Promise(resolve => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo.collection('users').find(query).toArray((err, result) => {
        db.close();
        resolve(result.map(user => ({...user, id: user._id})))
      });
    });
  });
}

module.exports = {
  createNewGroup,
  addToGroup,
  canJoinGroup,
  removeFromGroup,
  updateLocation,
  wipeMongo,
  checkEvents,
  getGroupLocations
};
