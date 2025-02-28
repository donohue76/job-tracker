import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import JobList from "@/components/JobList.vue";
import AddJob from "@/components/AddJob.vue";
import { useAuthStore } from "@/stores/authStore.js";

const routes = [
  { path: "/", redirect: "/login" }, // ✅ Ensure the root redirects to login
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/dashboard", component: JobList, meta: { requiresAuth: true } },
  { path: "/add", component: AddJob, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protect routes that require authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.accessToken) {
    next("/login");
  } else {
    next();
  }
});

export default router;