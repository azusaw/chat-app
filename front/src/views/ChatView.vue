<script>
import io from "socket.io-client";
import MessageCard from "../components/MessageCard.vue";
import ChatTextBox from "../components/ChatTextBox.vue";

export default {
  components: {
    MessageCard,
    ChatTextBox,
  },
  data() {
    return {
      activeUsers: new Set(),
      typingUsers: new Set(),
      messages: [],
      userName:
        "user-" + Math.floor(Math.random() * 1000000) /* 6digits user id*/,
      socket: io("localhost:5001", {
        withCredentials: true,
      }),
    };
  },
  methods: {
    // send a message to server
    sendMessage(message) {
      this.socket.emit("chat message", {
        message: message,
        userName: this.userName,
      });
    },

    // inform starting typing
    sendStartTyping() {
      console.log("send start typing");
      this.socket.emit("start typing", this.userName);
    },

    // inform stopping typing
    sendStopTyping() {
      console.log("send stop tuping");
      this.socket.emit("stop typing", this.userName);
    },
  },
  mounted() {
    //emit an event with the user id
    this.socket.emit("user connected", this.userName);

    //when a new user joined
    this.socket.on("new user connected", (data) => {
      console.log("hello", data);
      data.forEach((user) => this.activeUsers.add(user));
    });

    //when a user leaves
    this.socket.on("user disconnected", (data) => {
      console.log("user disconnected", data);
      this.activeUsers.delete(data);
      this.typingUsers.delete(data);
    });

    //when a new message is received
    this.socket.on("chat message", (data) => {
      this.messages.push({ ...data, datetime: new Date() });
    });

    //when a typing condition is changed
    this.socket.on("typing", (data) => {
      this.typingUsers = data;
    });
  },
};
</script>

<template>
  <div class="container">
    <div v-for="(item, idx) in messages" :key="idx">
      <MessageCard
        :userName="item.userName"
        :datetime="item.datetime"
        :message="item.message"
      />
    </div>

    <div class="sidenav">
      <div class="inbox__people">
        <h4>typing users</h4>
        <li v-for="user in typingUsers" :key="user">
          {{ user }}
        </li>
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
    <ChatTextBox
      class="chat-text-box"
      @sendMessage="sendMessage($event, message)"
      @sendStartTyping="sendStartTyping()"
      @sendStopTyping="sendStopTyping()"
    />
  </div>
</template>

<style scoped>
.container {
  /*position: relative;*/
}
.chat-text-box {
  /*position: fixed;*/
  /*bottom: 0;*/
}
</style>
