<script>
/* Message card in chat page */
export default {
  name: "MessageCard",
  props: {
    userName: {
      type: String,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      colorCord: "",
    };
  },
  mounted() {
    /* Create a hexadecimal color cord from user name easy for each user */
    this.colorCord =
      "#" +
      Number(this.userName.slice(5) * 10)
        .toString(16)
        .padStart(6, "F");
  },
};
</script>

<template>
  <div class="message-card">
    <el-avatar class="avatar" icon="Avatar" size="large" />
    <div class="message-container">
      <span class="user-name">{{ userName }}</span>
      <span class="datetime">
        {{ datetime.toLocaleDateString() }}
        {{ datetime.getHours().toString().padStart(2, "0") }}:{{
          datetime.getMinutes().toString().padStart(2, "0")
        }}
      </span>
      <div class="message">{{ message }}</div>
    </div>
  </div>
</template>

<style scoped>
.message-card {
  display: flex;
  margin-top: 30px;
  background-color: aliceblue;
  border-radius: 5px;
  padding: 15px 20px 20px 20px;
  color: #444;
}

.avatar {
  display: flex;
  float: left;
  background-color: v-bind(colorCord);
}

.message-container {
  flex: 1;
  max-width: 700px;
  margin-left: 30px;
}

.user-name {
  font-weight: bold;
}

.datetime {
  margin-left: 15px;
  font-size: 0.9rem;
  color: grey;
}

.message {
  margin-top: 10px;
}
</style>
