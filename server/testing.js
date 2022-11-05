const service = require('./service');

const area = [
  {latitude: -5, longitude: 0},
  {latitude: -5, longitude: -5},
  {latitude: 5, longitude: 0},
  {latitude: 5, longitude: -5},
];

var nathaniel;
var jace;
var group;

new Promise((resolve, reject) => {
  service
    .createNewGroup({
      name: 'Test Group',
      area: area,
    })
    .then(groupId => {
      service.addToGroup({name: 'Nathaniel', groupId: groupId}).then(res => {
        nathaniel = res.user;
        group = res.group;
        nathaniel.lkLoc = {latitude: 6, longitude: 5};
        service.addToGroup({name: 'Jace', groupId: groupId}).then(res => {
          jace = res.user;
          jace.lkLoc = {latitude: -2, longitude: -3};
          service.updateLocation(nathaniel, group.area).then(res => {
            service.checkEvents(nathaniel._id, group.groupId).then(res => {
              console.log("nathaniel noti" + res);
              service.updateLocation(jace, group.area).then(res => {
                service.checkEvents(jace._id, group.groupId).then(res => {
                  console.log("jace noti" +res);
                });
              });
            });
          });
        });
      });
    });
});
