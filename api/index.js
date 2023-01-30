const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5001;
const app = express();
const index = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// Static files
// app.use(express.static("public"));

// Socket setup
const io = socket(index, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
  pingTimeout: 4000,
  pingInterval: 4000,
});

//we use a set to store users, sets objects are for unique values of any type
const activeUsers = new Set();
const typingUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("user connected", function (data) {
    socket.userName = data;
    activeUsers.add(socket.userName);
    io.emit("new user connected", [...activeUsers]);
  });

  socket.on("chat message", function (data) {
    console.log("chat message", data);
    io.emit("chat message", data);
    typingUsers.delete(data.userName);
    io.emit("typing", [...typingUsers]);
  });

  socket.on("start typing", function () {
    typingUsers.add(socket.userName);
    io.emit("typing", [...typingUsers]);
  });

  socket.on("stop typing", function () {
    typingUsers.delete(socket.userName);
    io.emit("typing", [...typingUsers]);
  });

  socket.on("disconnect", function () {
    console.log("disconnect", socket.userName);
    activeUsers.delete(socket.userName);
    typingUsers.delete(socket.userName);
    io.emit("user disconnected", socket.userName);
    io.emit("typing", [...typingUsers]);
  });
});
