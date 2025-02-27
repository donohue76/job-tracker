import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import JobList from '@/components/JobList.vue';
import AddJob from '@/components/AddJob.vue';
import { useAuthStore } from '@/stores/authStore.js';

const pinia = createPinia(); // Ensure Pinia is created before using the store

const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/dashboard', component: JobList, meta: { requiresAuth: true } },
  { path: '/add', component: AddJob, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protect routes that require authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(pinia); // Explicitly pass Pinia instance

  if (to.meta.requiresAuth && !authStore.accessToken) {
    next('/'); // Redirect to login if not authenticated
  } else {
    next();
  }
});

export default router;