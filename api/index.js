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
});

//we use a set to store users, sets objects are for unique values of any type
const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("user connected", function (data) {
    console.log("user connected", data);
    socket.userName = data;
    activeUsers.add(data);
    console.log(activeUsers);
    //... is the the spread operator, adds to the set while retaining what was in there already
    io.emit("new user connected", [...activeUsers]);
  });

  socket.on("user disconnect", function () {
    console.log("bye bye");
    activeUsers.delete(socket.userName);
    io.emit("disconnected", socket.userName);
  });

  socket.on("chat message", function (data) {
    console.log("chat message", data);
    io.emit("chat message", data);
  });
});
