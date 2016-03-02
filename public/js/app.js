var socket = io();
$(document).ready(function() {
  $('.f').submit(function(event) {
    event.preventDefault();
    alert($('#m').val());
  });
});
