<script>
export default {
  name: "ChatTextBox",
  data() {
    return {
      message: "",
      isTyping: false,
    };
  },
  props: {
    userName: {
      type: String,
      required: true,
    },
    typingUsers: {
      type: Array,
    },
  },
  methods: {
    submit: function () {
      this.$emit("sendMessage", this.message);
      this.message = "";
    },
  },
  watch: {
    message(value) {
      if (value.length > 0) {
        if (!this.isTyping) {
          this.isTyping = true;
          this.$emit("sendStartTyping");
        }
      } else {
        this.isTyping = false;
        this.$emit("sendStopTyping");
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <!-- exclude user himself from typing user -->
    <span
      class="typing-users"
      v-if="
        typingUsers.length > 0 &&
        !(typingUsers.length === 1 && typingUsers[0] === userName)
      "
    >
      <span v-for="user in typingUsers" :key="user">
        <span v-if="user !== userName">{{ user }}</span>
      </span>
      typing...
    </span>
    <el-input
      class="chat-text-box"
      v-model="message"
      placeholder="Input messages here!"
      type="textarea"
      resize="none"
      :rows="4"
      :autosize="{ minRows: 4, maxRows: 4 }"
      @keyup.ctrl.enter="submit"
    />
    <el-button
      class="submit-button"
      type="primary"
      size="large"
      round
      icon="Promotion"
      :disabled="message.length === 0"
      :onclick="submit"
    >
      Ctrl + Enter
    </el-button>
  </div>
</template>

<style scoped>
.container {
  max-width: 750px;
  position: fixed;
  bottom: 5px;
}

@media screen and (max-width: 750px) {
  .container {
    max-width: 90vw;
  }
}

.chat-text-box {
  padding: 5px;
  width: 100%;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.typing-users {
  font-size: 0.8rem;
  margin-left: 5px;
  padding: 5px 10px;
  background-color: var(--primary-color);
  border-radius: 5px;
}

.submit-button {
  margin: 20px 10px;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
