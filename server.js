var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('connection established');
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
