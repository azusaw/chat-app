const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const fs = require("fs");

// App setup
const PORT = 5001;
const app = express();
const index = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
const dataFile = "data.json";

app.use(cors()); /* Allow other origin request*/
app.use(express.json()); /* for POST request*/

app.get("/info", function (req, res) {
  const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  res.send(data);
});

app.post("/info", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let data = JSON.stringify({ user: { id: id, name: name } }, null, " ");
  fs.writeFileSync(dataFile, data);
  res.send();
});

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
