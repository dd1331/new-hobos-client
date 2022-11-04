import { createRouter, createWebHistory } from "vue-router";
import Poster from "../components/Poster.vue";
import HomeView from "../views/HomeView.vue";
import PostListView from "../views/PostListView.vue";
import PostView from "../views/PostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/post/:id",
      name: "Post",
      component: PostView,
    },
    {
      path: "/post",
      name: "PostList",
      component: PostListView,
    },
    {
      path: "/poster",
      name: "PostList",
      component: Poster,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
