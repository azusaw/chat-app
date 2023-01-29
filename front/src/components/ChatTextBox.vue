<script>
export default {
  name: "ChatTextBox",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    submit: function () {
      this.$emit("sendMessage", this.message);
    },
  },
};
</script>

<template>
  <el-input
    v-model="message"
    @keyup.enter="submit"
    placeholder="Please input Message"
  />
</template>

<style scoped></style>
