import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import SummaryView from "../views/SummaryView.vue";
import ChatView from "../views/ChatView.vue";

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
      component: AboutView,
    },
    {
      path: "/summary",
      name: "summary",
      component: SummaryView,
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatView,
    },
  ],
});

export default router;
