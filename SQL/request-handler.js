var fs = require('fs');
var root = fs.readFileSync("../client/client/index.html");
var css = fs.readFileSync("../client/client/styles/styles.css");
var config = fs.readFileSync("../client/client/scripts/config.js");
var app = fs.readFileSync("../client/client/scripts/app.js");

var Users = require('./helpers/users-helper.js');
var Rooms = require('./helpers/rooms-helper.js');
var messagesHelper = require('./helpers/messages-helper.js').messagesHelper;
var messages = {};



var helpersRouter = {
  'users': Users,
  'rooms': Rooms,
  'messages': messagesHelper
};

/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  console.log("Serving request type " + request.method + " for url " + request.url);

  var postHandler = function(){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var message = JSON.parse(body);
      messagesHelper.post(message);
      response.end(JSON.stringify(message));
    });
  };






  if(request.method === "OPTIONS"){
    response.writeHead(200, headers);
    response.end();

  }else if(request.method === "GET"){
      // var data = helpersRouter[reuest.url].get();

    if(request.url === "/classes/messages" ){
      response.writeHead(200, headers);
      // console.log("from request Handler", mm);
      messagesHelper.get(function(data){

        response.end(JSON.stringify(data));
        console.log("From Get", data);
      });



    }else if(request.url === "/classes/room1"){
      response.writeHead(200,headers);
    }else if(request.url === "/" || request.url[1] === "?"){
      response.end(root);
    }else if(request.url === "/styles/styles.css"){
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.end(css);
    }else if(request.url === "/scripts/config.js") {
      response.writeHead(200, {'Content-Type': "text/javascript"});
      response.end(config);
    }else if(request.url === "/scripts/app.js") {
      response.writeHead(200, {'Content-Type': "text/javascript"});
      response.end(app);
    }else{
      response.writeHead(404, headers);
    }

  }else if(request.method === "POST"){
    if(request.url === "/classes/messages" ){
      response.writeHead(201, headers);
      postHandler();

    }else if(request.url === "/classes/room1"){
      response.writeHead(201, headers);
      postHandler();
    }
  }


};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"

};
