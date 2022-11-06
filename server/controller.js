const express = require('express');
const app = express();
app.use(express.json());
const service = require('./service');
const port = process.env.port || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/tigerhacks/createGroup', (req, res) => {
  const newGroup = req.body;
  let groupId = service.createNewGroup(newGroup).then(gId => {
    res.send({
      error: false,
      message: 'Success',
      groupId: gId,
    });
  });
});

app.post('/tigerhacks/canJoinGroup', (req, res) => {
  const groupId = req.body;
  service.canJoinGroup(groupId).then(result => {
    result
      ? res.send({error: false, message: ''})
      : res.send({error: true, message: 'Group does not exist.'});
  });
});

app.post('/tigerhacks/userJoinGroup', (req, res) => {
  const user = req.body;
  console.log(user);
  service.addToGroup(user).then(result => {
    result
      ? res.send({error: false, message: '', user: result.user, group: result.group})
      : res.send({error: true, message: 'Group does not exist.'});
  });
});

app.post('/tigerhacks/locationUpdate', (req, res) => {
  const userInfo = req.body; // {user: {_id, name, groupId, lkLoc, isOutside}, area: [{lat, long}]}
  console.log(userInfo);
  service.updateLocation(userInfo.user, userInfo.area).then(() => {
    service.checkEvents(userInfo.user.id, userInfo.user.groupId).then((result) => {
      res.send({error: false, notifications: result})
    })
  })
});
