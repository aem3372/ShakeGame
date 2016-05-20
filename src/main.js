addEventListener('DOMContentLoaded', function () {
  'use strict';
  window.onerror = function(e) {
    console.log(e);
  }
  
  lib.Breeze.call('user', 'getNick', {}, function(s) {
    var nick = s.msg;
    console.log('nick:' + nick);
    var socket = io.connect('http://192.168.137.1:8080/sock');
    socket.on('score', function(data) {
      console.log(data);
      document.getElementById('score').innerHTML = data;
    });

    socket.emit('uploadNick', nick);

    socket.on('started', function() {
      document.getElementById('score').innerHTML = '已经开始';
      lib.Breeze.addEventListener('BR_SHAKE', function(event) {
        console.log('shake event');
        socket.emit("uploadShake", "shake")
      });
      lib.Breeze.call('shake', 'open', {}, function(s) {

      }, function(e) {
        console.log('sersor error');
      });
    });

    socket.on('ended', function(data) {
      for(var i=0; i<3; ++i) {
        if(data[i].name == nick) {
          document.getElementById('score').innerHTML = '第' + (i+1) + '名';
          return ;
        }
      }
      document.getElementById('score').innerHTML = '未上榜';
    })
  }, function(e) {
    console.log('getNick error');
  });
});
