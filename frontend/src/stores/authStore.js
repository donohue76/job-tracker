import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "http://127.0.0.1:8000/api/auth/";
const REFRESH_TOKEN_URL = "http://127.0.0.1:8000/api/auth/token/refresh/";

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

      console.log("🛠 Retrieved from localStorage:");
      console.log("   Access Token:", this.accessToken);
      console.log("   Refresh Token:", this.refreshToken);

      if (this.accessToken) {
        this.setTokenExpiration();
      }
    },

    setTokenExpiration() {
      if (!this.accessToken) return;

      try {
        const decoded = jwtDecode(this.accessToken);
        this.tokenExpiration = decoded.exp * 1000;
        console.log("🔐 Token expires at:", new Date(this.tokenExpiration));

        this.scheduleTokenRefresh();
      } catch (error) {
        console.error("⚠ Failed to decode token:", error);
        this.logout(); // 🔴 Force logout on token decoding failure
      }
    },

    scheduleTokenRefresh() {
      if (!this.tokenExpiration) return;

      const now = Date.now();
      const refreshTime = this.tokenExpiration - now - 60000; // Refresh 1 minute before expiration

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
        console.log("🔄 Refreshing token before expiration...");
        this.refreshAccessToken();
      }
    },

    async refreshAccessToken() {
      if (!this.refreshToken) {
        console.warn("⚠ No refresh token found. Skipping token refresh.");
        return;
      }

      try {
        const response = await axios.post(REFRESH_TOKEN_URL, {
          refresh: this.refreshToken,
        });

        this.accessToken = response.data.access;
        localStorage.setItem("accessToken", this.accessToken);
        console.log("🔄 Access token refreshed successfully.");

        this.setTokenExpiration();
      } catch (error) {
        console.error("Token refresh failed:", error.response?.data || error.message);
        this.logout();
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

        console.log("Login successful:", response.data);

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

    async logout() {
      try {
        if (this.refreshToken) {
          await axios.post(`${API_BASE_URL}logout/`, { refresh: this.refreshToken });
        }

        // Clear user state and localStorage
        this.user = null;
        this.accessToken = null;
        this.refreshToken = null;
        this.tokenExpiration = null;
        clearTimeout(this.refreshTimeout);

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        console.log("🚪 Logged out successfully.");

        return { success: true };
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
        return { success: false, error };
      }
    },

    clearError() {
      this.errorMessage = null;
    },
  },
});