<script>
export default {
  name: "ChatTextBox",
  data() {
    return {
      message: "",
      isTyping: false,
    };
  },
  methods: {
    submit: function () {
      this.$emit("sendMessage", this.message);
      this.message = "";
    },
  },
  watch: {
    message(value) {
      console.log("message changed");
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
    <el-input
      class="chat-text-box"
      v-model="message"
      placeholder="Input message here!"
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
  text-align: right;
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
