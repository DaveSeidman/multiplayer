const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer({}, app);
const io = socketIo(server);
const port = 8000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());

const state = {
  players: [],
};

io.on('connection', (socket) => {
  const { device } = socket.handshake.query;
  console.log('device connected:', device);
  io.emit('connected', state);

  socket.on('message', (message) => {
    console.log({ message });
  });

  socket.on('disconnect', () => {
    console.log('device disconnected:', socket.id);
  });
});

server.listen(port, () => { console.log(`refuge server listening on port ${port}`); });
