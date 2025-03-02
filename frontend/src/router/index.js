import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import JobList from "@/components/JobList.vue";
import AddJob from "@/components/AddJob.vue";
import { useAuthStore } from "@/stores/authStore.js";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", component: LoginPage, meta: { guestOnly: true } },
  { path: "/register", component: RegisterPage, meta: { guestOnly: true } },
  { path: "/dashboard", component: JobList, meta: { requiresAuth: true } },
  { path: "/add", component: AddJob, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // ✅ Ensure auth state is initialized
  if (!authStore.accessToken) {
    authStore.initializeFromLocalStorage();
  }

  // 🔄 Check if token needs refreshing
  await authStore.refreshTokenIfNeeded();

  if (to.meta.requiresAuth && !authStore.accessToken) {
    console.warn("🔐 Unauthorized. Redirecting to login...");
    next("/login");
  } else if (to.meta.guestOnly && authStore.accessToken) {
    console.warn("🔄 Already logged in. Redirecting to dashboard...");
    next("/dashboard");
  } else {
    next();
  }
});

export default router;