// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const Db = require("./db"); // Assuming you have a Db module to manage socket-user mapping
const UserRoomDb = require('./userRoomDb');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "http://localhost:3000",
}));

const db = new Db();
const roomDb = new UserRoomDb();

io.on('connection', (socket) => {
  console.log('New client connected');


  socket.on('registerUser', (userId) => {
    db.addUserSocket(userId, socket.id);
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
  });


  socket.on("joinroom", (data, acknowledgment) => {
    if (roomDb.addUserToRoom(data.userName, data.roomName)) {
      socket.join(data.roomName);
      console.log(`User ${data.userName} joined room ${data.roomName}`);

      if (roomDb.getUsersInRoom(data.roomName).length === 1) {
        acknowledgment('User added successfully as the first member 1');
      } else {
        acknowledgment('User added successfully as the second member 2');
        io.to(data.roomName).emit("game start message");
      }
    } else {
      acknowledgment('Room is full');
    }
  });


  socket.on('message', (data) => {
    console.log('Message received:', data);
    socket.to(data.roomName).emit('message', data);
  });


  socket.on("opponentWin", (data) => {
    socket.to(data.roomName).emit("opponentWin", data);
  });


  socket.on("updatedMove", (data) => {
    console.log(`Move in room ${data.roomName} by ${data.userName}`);
    socket.broadcast.to(data.roomName).emit("moveDoneByOpponent", data);
  });


  socket.on('disconnect', () => {
    const removeUserName = db.getUserId(socket.id);
    const removeUserFromRoom = roomDb.getRoomByUserId(removeUserName);
    console.log(removeUserFromRoom,"-",removeUserName )
    if (removeUserFromRoom) {
      socket.to(removeUserFromRoom).emit("useropponent left the room")
      roomDb.removeUserFromRoom(removeUserFromRoom);
      db.removeUserSocket(socket.id);
    }
    console.log('Client disconnected');

  });
});


server.listen(3001, () => {
  console.log('Server is running on port 3001');
});