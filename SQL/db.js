var mysql = require('mysql');


/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect(function(err){
  if(err) throw err;
});

var newMessage = {text: "HELLO WORLD!", user_id: 1, room_id: 2, username: 'Joelcox', roomname: 'Lobby'};

// var query = dbConnection.query('INSERT INTO Messages SET ?', message, function(err, result){
//   console.log("GOT IT");
// });


exports.messages = {
    get: function(cb){
      dbConnection.query('SELECT * FROM Messages', function(err, result){
        if(err) throw err
          cb(result);
          // console.log("Get Mesages Results",result);
          // console.log('Got all Messages for the room', result );
      });
    },
    post: function(message, cb){
      console.log("IN DB");
      dbConnection.query('INSERT INTO Messages SET ?', message, function(err, result){
        if(err) throw err
          cb(result);
        // console.log('Inserted', message, result );
      })
    },
    find: function(id){
      dbConnection.query('SELECT * FROM Messages WHERE id ='+id, function(err, result){
        if(err) throw err
        console.log('found message !', result );
      })
    },
    findBy: function(column, val){
      dbConnection.query('SELECT * FROM Messages WHERE '+column+'='+val);
    }
};

exports.users = function(){
  return {
    get: function(){
      dbConnection.query('SELECT * FROM Users', function(err, result){
        if(err) throw err
        console.log('got all users', result );
      })
    },
    getByRoomId: function(room_id){
      dbConnection.query('SELECT * FROM Users WHERE room_id = '+room_id, function(err, result){
        if(err) throw err
        console.log('found user by room_id', result );
      })
    },
    post: function(user){
      dbConnection.query('INSERT INTO Users SET ?', user, function(err, result){
        if(err) throw err
        console.log('Inserted User', result );
      })
    },
    find: function(id){
      dbConnection.query('SELECT * FROM Users WHERE id ='+id, function(err, result){
        if(err) throw err
        console.log('found user', result );
      })
    }
  }
};

exports.rooms = function(){
  return {
    get: function(){
      dbConnection.query('SELECT * FROM Rooms', function(err, result){
        if(err) throw err
        console.log('got all rooms', result );
      })
    },
    getByUserId: function(user_id){
      dbConnection.query('SELECT * FROM Rooms WHERE user_id = '+user_id, function(err, result){
        if(err) throw err
        console.log('found room by user_id', result );
      })
    },
    post: function(user){
      dbConnection.query('INSERT INTO Rooms SET ?', user, function(err, result){
        if(err) throw err
        console.log('Inserted Room', result );
      })
    },
    find: function(id){
      dbConnection.query('SELECT * FROM Rooms WHERE id ='+id, function(err, result){
        if(err) throw err
        console.log('found room', result );
      })
    }
  }
};




// exports.newMessage(newMessage)

/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/



