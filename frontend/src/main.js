import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Initialize authStore *after* app.use(pinia)
import { useAuthStore } from './stores/authStore'; // Import your authStore
const authStore = useAuthStore();

app.mount('#app');