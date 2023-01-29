import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // component: AboutView,
    },
    {
      path: "/summary",
      name: "summary",
      // component: SummaryView,
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/ChatView.vue"),
    },
  ],
});

export default router;
