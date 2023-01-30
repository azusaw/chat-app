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
    typingUsers: {
      type: Set,
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
    <div class="typing-users" v-if="typingUsers.length > 0">
      <span v-for="user in typingUsers" :key="user"> {{ user }}&nbsp; </span>
      is typing...
    </div>
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
  bottom: 10px;
}
.typing-users {
  margin-left: 10px;
  font-size: 0.8rem;
  color: grey;
}
.chat-text-box {
  padding: 5px;
  width: 100%;
}
.submit-button {
  margin: 20px 10px;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
