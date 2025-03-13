// src/stores/authStore.js

import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

// Helper function to safely parse JSON from local storage
const safeParse = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    localStorage.removeItem(key); // uto-clear corrupted data
    return null;
  }
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: safeParse("user"), // Prevents crash on invalid JSON
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    errorMessage: null,
  }),

  actions: {
    async register(userData) {
      this.errorMessage = null;
      try {
        const response = await axios.post(`${API_BASE_URL}register/`, userData, {
          headers: { "Content-Type": "application/json" },
        });

        this.user = response.data.user;
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;

        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("refreshToken", this.refreshToken);

        return { success: true, data: response.data };
      } catch (error) {
        this.errorMessage = error.response?.data?.error || "Registration failed.";
        return { success: false, error };
      }
    },

    async login(usernameOrEmail, password) {
      this.errorMessage = null;
      try {
        const response = await axios.post(`${API_BASE_URL}login/`, {
          username: usernameOrEmail,
          password,
        });

        this.user = response.data.user;
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;

        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("refreshToken", this.refreshToken);

        return { success: true };
      } catch (error) {
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
        this.errorMessage = error.response?.data || "Logout failed.";
        return { success: false, error };
      }
    },

    clearError() {
      this.errorMessage = null;
    }
  }
});