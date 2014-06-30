var roomsUrl = 'http://127.0.0.1:3000/rooms';
window.userId = 1;
window.username = "Shanw";
var ajaxCall = function(url, type, data, cb){
  // console.log(data)
  $.ajax({
    url: url,
    type: type,
    data: JSON.stringify(data),
    success: function(data) {
      cb(data)
      console.log('Message with ID of ' + JSON.stringify(data) + ' was sucessfully sent');
    },
    error: function(data) {
      console.log('Message sending failed');
    }
  });
}

var Rooms = {
  post: function(room){

  },
}

var app = {
  //INIT & AJAX METHODS
  init: function(){
    this.server = 'http://127.0.0.1:3000/classes/messages';
    app.fetch(app.enterRoom);
    setInterval(function(){
      app.fetch(app.enterRoom);
    }, 1000);
  },

  send: function(message){
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('Message with ID of ' + JSON.stringify(data) + ' was sucessfully sent');
      },
      error: function(data) {
        console.log('Message sending failed');
      }
    });
  },

  fetch: function(callback){
    $.ajax({
      url: this.server,
      type: 'GET',
      success: function(data) {
        callback(data);
      }
    });
  },

  currentRoom: null,


  //MESSAGES FUNCTIONS
  handleSubmit: function(){
    var $text = $('.compose-chat').val();

    var user = window.location.href.slice(window.location.href.indexOf('=') + 1).split('&')[0];
    var roomURI = window.location.href.slice(window.location.href.indexOf('=') + 1).split('&')[1];
    var room = roomURI ? roomURI.split('=')[1] : 'default';
    var message = {
      'username': user,
      'text': $text,
      'roomname': $('.compose-chat').attr('data-roomname'),
      'user_id': 1, //DEFAULT CHANGE
      'room_id': $('.compose-chat').attr('data-roomId'),

    };
    app.send(message);
  },

  clearMessages: function() {
    $('#chats').html('');
  },

  addMessage: function(message) {
    $('<div class="chat">').text( message.username + ': ' + message.text + ": "+ message.roomname ).appendTo('#chats');
  },

  addMessages: function(messageArr){
    for(var i = 0; i < messageArr.length; i++){
      app.addMessage(messageArr[i]);
    }
  },


  //ROOM FUNCTIONS
  clearRooms: function(){
    $('#roomSelect').html('');
  },

  addRoom: function(room){
    // $('#roomSelect').append('<li><a href="" class="room"></a></li>').append('a').text(room);
    var $link = $('<a href="" data-roomId="'+room.id+'" data-roomname="'+room.roomname+'"  class="room">').text(room);
    $('#roomSelect').append('<li>').append($link);
  },

  addRooms: function(messagesArr){
    var rooms = _.uniq(_.pluck(messagesArr, 'roomname'));

    for(var i = 0; i < rooms.length; i++){
      if(rooms[i]){
        app.addRoom(rooms[i]);
      }
    }
  },

  enterRoom: function(messageArr) {
    if (app.currentRoom === null) {
      app.clearMessages();
      app.clearRooms();
      app.addRooms(messageArr);
      app.addMessages(messageArr);
    } else {
      app.clearRooms();
      app.addRooms(messageArr);

      app.clearMessages();
      var roomMessages = [];
      //loop through messageArr, and only display the ones whose "roomname" property matches app.currentRoom
      for (var i = 0; i < messageArr.length; i++) {
        if (messageArr[i].roomname === app.currentRoom) {
          roomMessages.push(messageArr[i]);
        }
      }
      app.addMessages(roomMessages);
    }
  }
}; //end of app object

$(document).ready(function(){
  //EVENT HANDLERS

  $("#login_modal").modal("show");

  //Send New Message
  $('#send').on('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    if (!$('.compose-chat').val()) {
      $('.compose-chat').val('We are too lazy to enter a message');
    }
    app.handleSubmit();
    $('.compose-chat').val('');
  });

  //Create New Room
  $('.new-room-form').on('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    var room = $('.new-room').val();
    // url, type, data, cb
    var roomObj = { 'user_id': window.userId, 'users_count': 1, 'roomname': room};
    if (room) {
      ajaxCall(roomsUrl, 'POST', roomObj, function(data){
        console.log("We Got the DATA on Client", data);
        $('.new-room').val('');
      });
    }
  });

  //Set currentRoom value and switch to that room
  $('#roomSelect').on('click', 'a', function(e){
    $('#message').attr("data-roomId", $(this).attr("data-roomId"));
    $('#message').attr("data-roomname", $(this).attr("data-roomname"));
    e.preventDefault();
    e.stopPropagation();
    app.currentRoom = $(this).text();
    app.fetch(app.enterRoom);
  });

  //GLOBAL FUNCTIONS
  app.init();

});



