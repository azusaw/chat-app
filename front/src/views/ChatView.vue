<script>
/* Chat page view */
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
      /* Create random user name copied from template file */
      userName:
        "user-" + Math.floor(Math.random() * 1000000) /* 6digits user id*/,
      socket: io(),
    };
  },
  methods: {
    /* Send a notification of new message to server with socket.io */
    sendMessage(message) {
      this.socket.emit("chat message", {
        message: message,
        userName: this.userName,
      });
    },
    /* Send a notification of typing is started to server with socket.io */
    sendStartTyping() {
      this.socket.emit("start typing", this.userName);
    },
    /* Send a notification of typing is stopped to server with socket.io */
    sendStopTyping() {
      this.socket.emit("stop typing", this.userName);
    },
  },
  mounted() {
    /* Send a notification of himself connection to server with socket.io */
    this.socket.emit("user connected", this.userName);

    /* Listen a notification of new user connection from server with socket.io */
    this.socket.on("new user connected", (data) => {
      openInfo("New user connected!");
      this.activeUsers = data;
    });

    /* Listen a notification of user disconnection from server with socket.io */
    this.socket.on("user disconnected", (data) => {
      if (this.userName !== data) {
        openInfo(`${data} disconnected..`);
      }
      //FIXME
      this.activeUsers.remove(data);
      this.typingUsers.remove(data);
    });

    /* Listen a notification of new message from server with socket.io */
    this.socket.on("chat message", (data) => {
      /* Exclude himself message */
      if (data.userName !== this.userName) {
        openInfo("New message!");
      }
      this.messages.push({ ...data, datetime: new Date() });
    });

    /* Listen a notification of typing condition from server with socket.io */
    this.socket.on("typing", (data) => {
      this.typingUsers = data;
    });
  },
  /* Send a notification of himself disconnection to server with socket.io */
  beforeUnmount() {
    this.socket.emit("user disconnect", this.userName);
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
      <div v-if="messages.length === 0" class="empty-container">
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
  max-width: 750px;
}

@media screen and (max-width: 750px) {
  .active-user {
    max-width: 90vw;
  }
}

.empty-container {
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
</style>
