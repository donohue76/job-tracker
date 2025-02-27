import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/auth/";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
  }),

  actions: {
    async login(username, password) {
      try {
        console.log("Sending login request with:", { username, password });

        const response = await axios.post(`${API_BASE_URL}login/`, 
          { username, password }, 
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Login response:", response.data);

        this.user = response.data.user;
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;

        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("refreshToken", this.refreshToken);

        return { success: true };
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return { success: false, error: error.response?.data || "Login failed" };
      }
    },

    async logout() {
      try {
        await axios.post(`${API_BASE_URL}logout/`, { refresh: this.refreshToken });

        this.user = null;
        this.accessToken = null;
        this.refreshToken = null;

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        return { success: true };
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
        return { success: false, error: error.response?.data || "Logout failed" };
      }
    }
  }
});