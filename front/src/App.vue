<script>
import { RouterLink, RouterView } from "vue-router";
import io from "socket.io-client";

export default {
  data() {
    return {
      message: "",
      activeUsers: new Set(),
      messages: [],
      userName: "user-" + Math.floor(Math.random() * 1000000),
      socket: io("localhost:5001", {
        withCredentials: true,
      }),
    };
  },
  methods: {
    // send a message to server
    sendMessage: function () {
      console.log("send", this.message);
      this.socket.emit("chat message", {
        message: this.message,
        nick: this.userName,
      });
      this.message = "";
    },
  },
  mounted() {
    //emit an event with the user id
    this.socket.emit("user connected", this.userName);

    //when a new user joined
    this.socket.on("new user connected", (data) => {
      data.map((user) => this.activeUsers?.add(user));
      console.log("new user", this.activeUsers);
    });

    //when a user leaves
    this.socket.on("user disconnected", (data) => {
      console.log("bye bye", data);
      this.activeUsers?.remove(userName);
    });

    //when a new message is received
    this.socket.on("chat message", (data) => {
      console.log("new message", data.nick, data.message);
      this.messages?.push(data);
    });
  },
};
</script>

<template>
  <img
    alt="Vue logo"
    class="logo"
    src="@/assets/logo.svg"
    width="125"
    height="125"
  />

  <div class="wrapper">
    <!--      <nav>-->
    <!--        <RouterLink to="/">Home</RouterLink>-->
    <!--        <RouterLink to="/about">About</RouterLink>-->
    <!--      </nav>-->
    <div>
      <h1>Chat</h1>
      <ul>
        <li v-for="(msg, idx) in messages" :key="idx">{{ msg }}</li>
      </ul>
      <div>
        <input type="text" @keyup.enter="sendMessage()" v-model="message" />
        {{ this.message }}
      </div>
    </div>
    <div class="sidenav">
      <div class="inbox__people">
        <h4>Active users</h4>
        <li v-for="user in activeUsers" :key="user">
          {{ user }}
        </li>
      </div>
    </div>
  </div>
  <!--  <RouterView />-->
</template>

<style scoped></style>
