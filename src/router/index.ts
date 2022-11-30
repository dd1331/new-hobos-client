import { createRouter, createWebHistory } from "vue-router";
import Poster from "../components/Poster.vue";
import Signup from "../components/Signup.vue";
import HomeView from "../views/HomeView.vue";
import PostListView from "../views/PostListView.vue";
import PostView from "../views/PostView.vue";

import { useUserStore } from "../stores/user";
import { UNAUTHORIZED } from "../constants";
import Profile from "../components/Profile.vue";
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
      path: "/poster/:id?",
      name: "Poster",
      component: Poster,
      meta: { authRequired: true },
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    { path: "/profile", name: "Profile", component: Profile },
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
router.beforeEach((to, from) => {
  const token = useUserStore().accessToken;
  if (to.meta.authRequired && !token) throw new Error(UNAUTHORIZED);
  // explicitly return false to cancel the navigation
  return true;
});

export default router;
