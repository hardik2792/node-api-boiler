module.exports = (app) => {
  const io = require('socket.io')(app);
  io.on('connection', function(client) {
      console.log("Connected",client.id);
      client.on('disconnect', function() {
        console.log("disconnected");
      });
      client.on('room', function(data) {
        client.join(data.roomId);
        console.log(' Client joined the room and client id is '+ client.id);
      });
      client.on('toBackEnd', function(data) {
        client.in(data.roomId).emit('message', data);
      });
  });
}