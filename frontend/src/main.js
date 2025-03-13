import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// ✅ Import Vuetify
import vuetify from './plugins/vuetify';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify); // ✅ Use Vuetify

// Initialize authStore *after* app.use(pinia)
import { useAuthStore } from './stores/authStore';
const authStore = useAuthStore();

app.mount('#app');