addEventListener('DOMContentLoaded', function () {
  'use strict';
  window.onerror = function(e) {
    console.log(e);
  }
  
  var socket = io.connect('http://localhost:8080/sock');
  socket.on('score', function(data) {
    console.log(data);
    document.getElementById('score').innerHTML = data;
  });

  socket.emit('uploadNick', 'test');

  socket.on('started', function() {
    setInterval(function() {
      socket.emit("uploadShake", "shake")
    }, 1000);
  });
});
