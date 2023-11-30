// SETUP
///////////////////////////////////////////////////

var express = require('express'); // load express package
var app = express(); //create express app
var serv = require('http').Server(app); //serve http over app
var io = require('socket.io')(serv); // connect socket.io to server
var pollResults = [0,0,0,0,0,0,0,0,0,0,0,0]
// HTTP SERVER
///////////////////////////////////////////////////

//Start Server
serv.listen(process.env.PORT); // specified port or 8k as backup

//route main page in index
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

//Serve static files
app.use('/client',express.static(__dirname + '/client'));

// promise is broken
// SOCKET HANDLING
///////////////////////////////////////////////////

//handle incoming socket connections
io.sockets.on('connection', function (socket) {

	//log a new connection
	console.log('a new user connected. ID: ',socket.id);
    socket.emit('handshake');
  //listeners here. Don't forget to use io.sockets.emit, not socket.emit
  socket.on('Bunnypicked',function(id){
    if (id){
      pollResults[id] += 1
    }
    console.log('A new user responded. Cumulative results: ',pollResults)
    io.to(socket.id).emit('polls',pollResults)
  })
});