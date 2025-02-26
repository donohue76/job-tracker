import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import JobList from '@/components/JobList.vue';
import AddJob from '@/components/AddJob.vue';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: JobList, meta: { requiresAuth: true } },
  { path: '/add', component: AddJob, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protect routes that require authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.accessToken) {
    next('/');
  } else {
    next();
  }
});

export default router;