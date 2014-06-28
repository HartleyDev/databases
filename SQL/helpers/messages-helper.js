var db = require('../db.js');

exports.messagesHelper = {
    get: function(callback){
      db.messages.get(function(data){
        callback(data);
      });
    },
    post: function(message){
      // var user = db.users.find(user_id);
      var result;
      db.messages.post(message, function(result){
        // console.log("from helper", result)
      });
    },
    find: function(message_id){
      db.messages.find(message_id);
    },
    getByRoomId: function(room_id){
      return db.messages.findBy('room_id', room_id);
    },
    findByUserId: function(user_id){
      return db.messages.findBy('user_id', user_id);
    },
    destory: function(){},
}


