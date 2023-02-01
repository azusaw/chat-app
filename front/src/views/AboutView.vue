<script>
export default {
  data() {
    return {
      users: [],
    };
  },
};
</script>

<template>
  <div class="container">
    <h1>About this website</h1>
    <img src="/public/about.png" alt="cat_in_box" width="300" />
    <div class="text-container">
      <p>
        Hello again, it's azusaw<br />
        I'm studying web development at University of Aberdeen.<br />
        <br />
        I created this website to learn new things of web development by
        myself<br />
        and hope to help people who learn programming.<br />
      </p>
      <p class="nav-info">
        <el-tag effect="dark" round>/Wiki</el-tag> ... you can see a brief
        introduction to each programming language.<br /><br />
        <el-tag effect="dark" round>/Summary</el-tag> ... you can see summary of
        that how I developed this website.<br /><br />
        <el-tag effect="dark" round>/Chat</el-tag> ... you can chat with other
        people who viewing his website.
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
}
.text-container {
  max-width: 500px;
  text-align: center;
  margin: 0 auto;
  line-height: 1.8;
}
.nav-info {
  margin: 50px 0 30px;
}
</style>
