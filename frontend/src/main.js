import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore"; // Import auth store

const app = createApp(App);
app.use(createPinia());
app.use(router);

const authStore = useAuthStore();
authStore.initializeFromLocalStorage(); // Restore auth state

// Refresh token if needed before loading app
setTimeout(() => authStore.refreshTokenIfNeeded(), 1000);

// 🔄 Axios Interceptor: Automatically refresh token on 401 errors
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();

    if (error.response?.status === 401 && authStore.refreshToken) {
      try {
        console.log("🔄 Refreshing token...");
        await authStore.refreshAccessToken(); // Directly call refreshAccessToken

        // Retry the failed request with the new token
        error.config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        authStore.logout(); // 🔐 Logout user on failed refresh
      }
    }
    return Promise.reject(error);
  }
);

app.mount("#app");