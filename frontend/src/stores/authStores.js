import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/auth/';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
  }),
  
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${API_BASE_URL}login/`, {
          username,
          password
        });

        this.user = response.data.user;
        this.accessToken = response.data.access;
        
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('accessToken', this.accessToken);
        
        return { success: true };
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return { success: false, error: error.response?.data || 'Login failed' };
      }
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    }
  }
});