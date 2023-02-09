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
      drawer: false,
      middleSize: ["hidden-all", "lg", "xl"],
    };
  },
  methods: {
    openDrawer() {
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
    },
  },
};
</script>

<template>
  <el-container class="container">
    <el-header class="header">
      <LogoSvg />
      <nav class="pc-nav">
        <RouterLink
          class="nav-item"
          v-for="item in pages"
          :key="item.name"
          :to="item.path"
          >{{ item.name }}</RouterLink
        >
      </nav>
      <div class="mobile-nav" :onclick="openDrawer">Menu</div>
      <el-drawer v-model="drawer" size="300">
        <nav>
          <RouterLink
            class="drawer-nav-item"
            v-for="item in pages"
            :key="item.name"
            :to="item.path"
            :onclick="closeDrawer"
            >{{ item.name }}</RouterLink
          >
        </nav>
      </el-drawer>
    </el-header>
    <el-main class="main"><RouterView /></el-main>
    <!-- hide footer in chat page -->
    <el-footer class="footer" v-show="this.$route.path !== '/chat/'">
      Copyright {{ new Date().getFullYear() }} azusaw All rights reserved.
    </el-footer>
  </el-container>
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0;
  max-width: 800px;
}

@media screen and (max-width: 800px) {
  .container {
    max-width: 100vw;
  }
}

.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  height: var(--header-height);
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  z-index: 10;
}

.pc-nav,
.mobile-nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
}

/* apply when screen width is smaller than 660px */
@media screen and (max-width: 660px) {
  .pc-nav {
    display: none;
  }
}

/* apply when screen width is wider than 661px */
@media screen and (min-width: 661px) {
  .mobile-nav {
    display: none;
  }
}

.mobile-nav,
.nav-item,
.drawer-nav-item {
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

.drawer-nav-item {
  display: block;
  color: #444;
}

.main {
  min-height: calc(100vh - 120px);
  padding: 20px 10px;
  max-width: 100vw;
}

.footer {
  height: 40px;
  text-align: center;
  font-size: 0.8rem;
  background-color: var(--primary-color);
}
</style>
