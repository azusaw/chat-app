<script>
import io from "socket.io-client";
import MessageCard from "../components/MessageCard.vue";
import ChatTextBox from "../components/ChatTextBox.vue";
import { openInfo } from "@/components/notification";

export default {
  components: {
    MessageCard,
    ChatTextBox,
  },
  data() {
    return {
      activeUsers: [],
      typingUsers: [],
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
      this.socket.emit("stop typing", this.userName);
    },
  },
  mounted() {
    //emit an event with the user id
    this.socket.emit("user connected", this.userName);

    //when a new user joined
    this.socket.on("new user connected", (data) => {
      openInfo("New user connected!");
      this.activeUsers = data;
    });

    //when a user leaves
    this.socket.on("user disconnected", (data) => {
      openInfo(`${data} disconnected..`);
      //FIXME
      this.activeUsers.remove(data);
      this.typingUsers.remove(data);
    });

    //when a new message is received
    this.socket.on("chat message", (data) => {
      data.userName !== this.userName && openInfo("New message is received.");
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
    <div class="active-user">
      {{ activeUsers.size }}
      <span v-if="activeUsers.size === 1">user is</span>
      <span v-else>users are</span>
      online! :
      <span v-for="user in activeUsers" :key="user"> {{ user }}&nbsp; </span>
    </div>
    <div>
      <div v-if="messages.length === 0" class="empty">
        <img src="/assets/empty.png" width="300" />
        <div class="empty-text">No message...</div>
      </div>
      <div v-else class="message-area">
        <MessageCard
          v-for="(item, idx) in messages"
          :key="idx"
          :userName="item.userName"
          :datetime="item.datetime"
          :message="item.message"
        />
      </div>
      <ChatTextBox
        class="chat-text-box"
        :userName="userName"
        :typingUsers="typingUsers"
        @sendMessage="sendMessage($event, $message)"
        @sendStartTyping="sendStartTyping()"
        @sendStopTyping="sendStopTyping()"
      />
    </div>
  </div>
</template>

<style scoped>
.active-user {
  position: fixed;
  top: 90px;
  padding: 5px 10px;
  background-color: var(--secondary-color);
  font-weight: 500;
  width: 100%;
  max-width: 740px;
}
.empty {
  width: 300px;
  margin: 150px auto;
  text-align: center;
}
.empty-text {
  margin-top: 15px;
}

.message-area {
  margin-bottom: 120px; /* avoid overlapping with message box*/
}

.chat-text-box {
  /*position: fixed;*/
  /*bottom: 0;*/
}
</style>
