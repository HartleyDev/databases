var db = require('../db.js');

exports.roomsHelper = {
    get: function(callback){
      db.rooms.get(function(data){
        callback(data);
      });
    },
    post: function(room){
      // var user = db.users.find(user_id);
      db.rooms.post(room, function(result){
        // console.log("from helper", result)
      });
    },
    find: function(message_id){
      db.rooms.find(message_id);
    },
    getByRoomId: function(room_id){
      return db.messages.findBy('room_id', room_id);
    },
    findByUserId: function(user_id){
      return db.messages.findBy('user_id', user_id);
    },
    destory: function(){},
}


