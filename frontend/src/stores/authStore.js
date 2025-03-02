import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure this is correctly installed

const API_BASE_URL = "http://127.0.0.1:8000/api/auth/";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    tokenExpiration: null,
    refreshTimeout: null,
    errorMessage: null,
  }),

  actions: {
    initializeFromLocalStorage() {
      console.log("Restoring auth state...");
      this.user = JSON.parse(localStorage.getItem("user")) || null;
      this.accessToken = localStorage.getItem("accessToken") || null;
      this.refreshToken = localStorage.getItem("refreshToken") || null;
      this.setTokenExpiration();
    },

    setTokenExpiration() {
      if (!this.accessToken) return;
      try {
        const decoded = jwtDecode(this.accessToken);
        this.tokenExpiration = decoded.exp * 1000; // Convert to milliseconds
        console.log("Token expires at:", new Date(this.tokenExpiration));
        this.scheduleTokenRefresh();
      } catch (error) {
        console.error("⚠Failed to decode token:", error);
        this.logout();
      }
    },

    scheduleTokenRefresh() {
      if (!this.tokenExpiration) return;
      const now = Date.now();
      const refreshTime = this.tokenExpiration - now - 30; // Refresh 1 min before expiry
      if (refreshTime > 0) {
        console.log(`Scheduling token refresh in ${refreshTime / 1000} seconds`);
        this.refreshTimeout = setTimeout(() => this.refreshAccessToken(), refreshTime);
      } else {
        console.warn("Token already expired. Logging out...");
        this.logout();
      }
    },

    refreshTokenIfNeeded() {  
      const now = Date.now();
      if (this.tokenExpiration && now > this.tokenExpiration - 60000) {
        console.log("Refreshing token before expiration...");
        this.refreshAccessToken();
      }
    },

    async login(username, password) {  // Now inside `actions`
      this.errorMessage = null;
      try {
        const response = await axios.post(`${API_BASE_URL}login/`, 
          { username, password }, 
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Login successful:", response.data);
        this.user = response.data.user || { username };
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;

        console.log("Storing tokens in localStorage...");
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("refreshToken", this.refreshToken);

        this.setTokenExpiration();

        return { success: true };
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        this.errorMessage = error.response?.data?.error || "Login failed.";
        return { success: false, error };
      }
    },

    async refreshAccessToken() {
      if (!this.refreshToken) return;
      try {
        const response = await axios.post(`${API_BASE_URL}token/refresh/`, {
          refresh: this.refreshToken,
        });

        this.accessToken = response.data.access;
        localStorage.setItem("accessToken", this.accessToken);
        console.log("Access token refreshed successfully.");
        this.setTokenExpiration();
      } catch (error) {
        console.error("Token refresh failed:", error.response?.data || error.message);
        this.logout();
      }
    },

    async logout() {
      try {
        await axios.post(`${API_BASE_URL}logout/`, { refresh: this.refreshToken });

        this.user = null;
        this.accessToken = null;
        this.refreshToken = null;
        this.tokenExpiration = null;
        clearTimeout(this.refreshTimeout);

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        console.log("Logged out successfully.");
        return { success: true }; // Ensure it returns success
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
        this.errorMessage = error.response?.data || "Logout failed.";
        return { success: false, error: this.errorMessage }; // Ensure error returns
      }
    },

    clearError() {
      this.errorMessage = null;
    }
  }
});