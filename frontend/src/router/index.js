import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  {
    path: '/',
    redirect: '/dashboard'  // Changed from '/jobs' to '/dashboard' to match your structure
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    // Add a catch-all route for 404
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  try {
    if (to.meta.requiresAuth) {
      const isAuthenticated = await authStore.checkAuth();
      
      if (!isAuthenticated) {
        next({ 
          path: '/login', 
          query: { redirect: to.fullPath } 
        });
        return;
      }
    } else if (authStore.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
      next('/dashboard');
      return;
    }
    
    next();
  } catch (error) {
    console.error('Navigation guard error:', error);
    next('/login');
  }
});

export default router;