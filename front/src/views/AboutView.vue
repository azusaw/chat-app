<script>
/* About page view */
export default {
  data() {
    return {
      navInfo: [
        {
          name: "/Wiki",
          description:
            "You can see a brief introduction to each programming language.\nYou can edit information if you want!",
        },
        {
          name: "/Summary",
          description:
            "You can see summary of that how I developed this website.",
        },
        {
          name: "/Chat",
          description:
            "You can enjoy chat with other people who is viewing this website.",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="container">
    <h1>About this website</h1>
    <img src="/assets/about.png" alt="cat_in_box" width="300" />
    <div class="text-container">
      <p>
        Hello again, it's azusaw.<br />
        I'm studying web development at University of Aberdeen.<br />
        <br />
        I created this website to learn new things of web development by
        myself<br />
        and hope to help people who learn programming.<br />
      </p>
      <h2>What you can do</h2>
      <p v-for="(item, idx) in navInfo" :key="idx" class="nav-info">
        <el-tag effect="dark" type="warning" round>{{ item.name }}</el-tag>
        ...
        {{ item.description }}
      </p>
      <p>I hope you enjoy my website! 😊</p>
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
  margin: 0 auto 30px;
  line-height: 1.8;
}

.nav-info {
  margin: 30px 0;
}

h2 {
  margin-top: 50px;
}
</style>
