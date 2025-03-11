import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js"; // Import the auth store at the top
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import AddJob from "@/components/AddJob.vue";
import Profile from "@/views/Profile.vue";
import SearchFilter from "@/components/shared/SearchFilter.vue"; // ✅ Ensure correct import
import Applications from "@/views/Applications.vue";
import Settings from "@/views/Settings.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/add", component: AddJob, meta: { requiresAuth: true } },
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/settings", component: Settings, meta: { requiresAuth: true } }, // ✅ Fix missing route
  { path: "/search", component: SearchFilter, meta: { requiresAuth: true } },
  { path: "/applications", component: Applications, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Authentication guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Now initialized properly at the top

  if (to.meta.requiresAuth && !authStore.accessToken) {
    next("/login");
  } else {
    next();
  }
});

export default router;