import { defineStore } from "pinia";
import { registerUser, loginUser } from "@/api";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/auth/";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    errorMessage: null, // Global error state
  }),

  actions: {
    initializeFromLocalStorage() {
      console.log("Initializing from local storage...");
      this.user = JSON.parse(localStorage.getItem("user")) || null;
      this.accessToken = localStorage.getItem("accessToken") || null;
      this.refreshToken = localStorage.getItem("refreshToken") || null;
    },


    async register(userData) {
      this.errorMessage = null; // Reset error before request
      try {
        const data = await registerUser(userData);
        return { success: true, data };
      } catch (error) {
        console.error("Register error:", error);
        this.errorMessage = error.message || "Registration failed."; // ✅ Store error globally
        return { success: false, error };
      }
    },

    async login(username, password) {
      this.errorMessage = null;
      try {
        const response = await axios.post(`${API_BASE_URL}login/`, 
          { username, password }, 
          { headers: { "Content-Type": "application/json" } }
        );

        this.user = response.data.user;
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;

        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("refreshToken", this.refreshToken);

        return { success: true };
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        this.errorMessage = error.response?.data?.error || "Login failed.";
        return { success: false, error };
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
        this.errorMessage = error.response?.data || "Logout failed.";
        return { success: false, error };
      }
    },

    clearError() {
      this.errorMessage = null; // Function to manually reset errors
    }
  }
});