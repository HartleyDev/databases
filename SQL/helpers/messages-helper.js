var db = require('../db.js');

exports.Messages = {
    getByRoomId: function(roomId){
      // query the db.js
        //
    },
    post: function(message, user_id){
      var user = db.users.find(user_id);
      message.user_id = user.id;
      message.username = user.username;
      db.messages.post(message);
    },
    find: function(){},
    destory: function(){},
}

