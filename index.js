const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const path = require('path');


const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: [{
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }, {
    origin: "http://192.168.0.213:3000",
    methods: ["GET", "POST"]
  }]
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile('index.html', path.join(__dirname, 'build'));
})

app.use(cors());

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'system', text: `${user.name}, welcome to room ${user.room}.` });
    socket.broadcast.to(user.room).emit('message', { user: 'system', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message, date: new Intl.DateTimeFormat('en-Us', { year: "numeric", month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' }).format(Date.now()) });

    callback();
  });



  socket.on('disconnect', () => {

    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'system', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
