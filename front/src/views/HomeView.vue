<script>
/* Home page view */
export default {
  data() {
    return {
      cards: [
        {
          title: "About",
          img: "/assets/about.png",
          text: "What you can do in here",
          href: "/about",
        },
        {
          title: "Wiki",
          img: "/assets/wiki.png",
          text: "Learn about programming",
          href: "/wiki",
        },
        {
          title: "Summary",
          img: "/assets/summary.png",
          text: "How this website was developed",
          href: "/summary",
        },
        {
          title: "Chat",
          img: "/assets/chat.png",
          text: "Enjoy real time chatting!",
          href: "/chat",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="container">
    <img src="/assets/home.png" alt="girl1" width="450" />
    <h1>Welcome to azusaw website!</h1>
    <el-row :gutter="10" justify="space-around">
      <el-col :xs="12" :sm="6" v-for="(card, idx) in cards" :key="idx">
        <RouterLink :to="card.href">
          <el-card class="card" :body-style="{ padding: '20px 0' }">
            <img :src="card.img" width="180" height="160" />
            <div class="card-text-container">
              <h3>{{ card.title }}</h3>
              <div class="text">{{ card.text }}</div>
            </div>
          </el-card>
        </RouterLink>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
}

.card {
  width: 180px;
  margin-bottom: 50px;
}

.card:hover {
  color: aliceblue;
  background-color: transparent;
}

.card-text-container {
  padding: 15px;
}

.text {
  font-size: 0.9rem;
}

img {
  margin: 3rem auto;
}

h1 {
  margin-bottom: 80px;
}

h3 {
  margin: 0;
  padding: 10px 0;
}
</style>
