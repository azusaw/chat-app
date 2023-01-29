<script>
import LogoSvg from "./components/Logo.vue";

export default {
  components: { LogoSvg },
  data() {
    return {
      pages: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Work Summary", path: "/summary" },
        { name: "Chat", path: "/chat" },
      ],
    };
  },
};
</script>

<template>
  <el-container class="container">
    <el-header class="header">
      <LogoSvg />
      <nav class="nav">
        <RouterLink
          class="nav-item"
          v-for="item in pages"
          :key="item.name"
          :to="item.path"
          >{{ item.name }}</RouterLink
        >
      </nav>
    </el-header>
    <el-main class="main"><RouterView /></el-main>
    <el-footer class="footer">Footer</el-footer>
  </el-container>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: lightblue;
}

.nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
}

.nav-item {
  margin: 10px;
}

.main {
  min-height: calc(100vh - 100px);
}

.footer {
  height: 40px;
  background-color: lightblue;
}
</style>
