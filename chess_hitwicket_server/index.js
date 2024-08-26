const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import CORS middleware
const Db=require("./db")
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

io.on('connection', (socket) => {
  console.log('New client connected');

 
  socket.on('registerUser', (userId) => {
    db.addUserSocket(userId, socket.id);
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
  });

  socket.on('message', (data) => {
    console.log('Message received:', data);
    socket.emit('message', 'Message received!');
  });

  socket.on("move", (data) => {
    console.log("Move made");
  });

  socket.on("opponentWin",(data)=>{
    socket.broadcast.emit("opponentWin",data);
})

  socket.on("updatedMove", (data) => {
    console.log(data);
    socket.broadcast.emit("moveDoneByOpponent", data);
  });

  socket.on('disconnect', () => {
    db.removeUserSocket(socket.id);
    console.log('Client disconnected');
  });
});
server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
