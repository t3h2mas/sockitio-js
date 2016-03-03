var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var irc = require('irc');

var client; // TODO: don't use global

function bindClient(c) {
  // irc client callbacks

  c.on('error', function(msg) {
    console.log('irc.Client error: ' + msg);
  });

  c.on('message', function(from, to, message) {
    m = from + ' => ' + to + ': ' + message;
    console.log(m);
    io.emit('chat message', m);
  });
}

io.on('connection', function(socket) {
  console.log('connection established');

  socket.on('user info', function(info) {
    // this should be called first; info from modal form
    client = new irc.Client(info.server, info.nick, { channels: [info.chan] });
    console.log('irc client established: ');
    bindClient(client);

  })

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);

    // send the msg to the client(s)
    // TODO: consider explicit msg names
    client.say('##socketdotio',msg);
    io.emit('chat message', 'me: ' + msg);
  });

});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
