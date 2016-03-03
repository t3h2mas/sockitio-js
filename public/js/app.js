var socket = io();
$(document).ready(function() {

  var nick, server, chan;

  $('#userInfo').submit(function (event) {
    event.preventDefault();

    nick = $('#nick').val();
    server = $('#server').val();
    chan = $('#chan').val();

    var resp = {nick: nick, server: server, chan: chan};
    socket.emit('user info', resp);

    $('.overlay').remove();
    $('.overlay-message').remove();
  })

  $('.f').submit(function(event) {
    event.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
  });

  socket.on('chat message', function(msg) {
    // TODO: move user messages to client.
    var $new = $('<li />').text(msg);
    $('#messages').append($new);
  });
});
