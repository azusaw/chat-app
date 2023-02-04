<script>
import LogoSvg from "./components/Logo.vue";

export default {
  components: { LogoSvg },
  data() {
    return {
      pages: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about/" },
        { name: "Wiki", path: "/wiki/" },
        { name: "Summary", path: "/summary/" },
        { name: "Chat", path: "/chat/" },
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
    <!-- hide footer in chat page -->
    <el-footer class="footer" v-show="this.$route.path !== '/chat'">
      Copyright {{ new Date().getFullYear() }} azusaw All rights reserved.
    </el-footer>
  </el-container>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  height: var(--header-height);
  padding-left: 10px;
  background-color: var(--primary-color);
  color: white;
  z-index: 10;
}

.nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
}

.nav-item {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  font-weight: 600;
}

.nav-item:hover {
  cursor: pointer;
  color: var(--primary-color);
  background-color: aliceblue;
  box-shadow: 0 0 20px 0 aliceblue;
  transition: 0.5s;
}

.main {
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.footer {
  height: 40px;
  text-align: center;
  font-size: 0.8rem;
  background-color: var(--primary-color);
}
</style>
