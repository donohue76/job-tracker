import { createRouter, createWebHistory } from 'vue-router';
import JobList from '@/components/JobList.vue';
import AddJob from '@/components/AddJob.vue';

const routes = [
  { path: '/', component: JobList },
  { path: '/add', component: AddJob },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;