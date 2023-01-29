<script>
import io from "socket.io-client";
import ChatTextBox from "../components/ChatTextBox.vue";

export default {
  components: {
    ChatTextBox,
  },
  data() {
    return {
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
    sendMessage(message) {
      console.log("send", message);
      this.socket.emit("chat message", {
        message: message,
        userName: this.userName,
      });
      // this.message = "";
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
  <div>
    <h1>Chat</h1>
    <ul>
      <li v-for="(msg, idx) in messages" :key="idx">{{ msg }}</li>
    </ul>
    <ChatTextBox
      :message="message"
      :changeMessage="changeMessage"
      @sendMessage="sendMessage($event, message)"
    />
  </div>
  <div class="sidenav">
    <div class="inbox__people">
      <h4>Active users</h4>
      <li v-for="user in activeUsers" :key="user">
        {{ user }}
      </li>
    </div>
  </div>
</template>

<style scoped></style>
