var MongoClient = require('mongodb').MongoClient;
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
  const query = {_id: user._id};
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
  const query = {_id: user.id};
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
        console.log('res '+JSON.stringify(res));
        if (err) throw err;
        dbo.collection('events').findOne({_id: user.id}, (err, res) => {
          if (res) {
            if (!isPointOutside(area, curLoc)) {
              dbo.collection('events').findOneAndDelete(query);
              resolve();
            }else{
              resolve();
            }
          } else {
            if (isPointOutside(area, curLoc)) {
              dbo.collection('events').insertOne(
                {
                  _id: user._id,
                  name: user.name,
                  sentTo: [user._id],
                  groupId: user.groupId,
                },
                (err, res) => {
                  if (err) throw err;
                  resolve();
                },
              );
            }else{
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
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      let events = dbo.collection('events').find({groupId: groupId})
      events.forEach((event, i) => {
        if (!event.sentTo.includes(userId) && event._id !== userId) {
          notis.push(userId);
          updateSentTo(event._id, [...event.sentTo, userId]).then(() => {
            if(i === events.length-1) resolve(notis);
          });
        }
      });
    });
  });
}

function updateSentTo(eventId, newSentTo) {
  console.log("Update sent to");
  const update = {
    $set: {
      sentTo: newSentTo,
    },
  };
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo.collection('events').updateOne({_id: eventId}, update, (err, res) => {
        if (err) throw err;
        resolve();
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
};
