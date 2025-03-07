<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="p-6 bg-white shadow-md rounded-md w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-700">Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4 mt-4">
        <div>
          <label for="username" class="block text-gray-600 mb-1">Username</label>
          <input id="username" v-model="username" placeholder="Enter your username" required
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>

        <div>
          <label for="password" class="block text-gray-600 mb-1">Password</label>
          <input id="password" v-model="password" type="password" placeholder="Enter your password" required
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>

        <button 
          :disabled="loading"
          class="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-all"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="31.4 31.4"
              stroke-linecap="round"></circle>
          </svg>
          {{ loading ? "Logging in..." : "Login" }}
        </button>

        <p v-if="errorMessage" class="text-red-500 bg-red-100 border border-red-400 text-sm mt-2 p-2 rounded-md">
          {{ errorMessage }}
        </p>
      </form>

      <p class="mt-4 text-center text-gray-600">
        Don’t have an account? 
        <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);

const handleLogin = async () => {
  errorMessage.value = ''; // Clear previous errors
  loading.value = true;

  const result = await authStore.login(username.value, password.value);

  if (result.success) {
    router.push('/dashboard');
  } else {
    errorMessage.value = result.error?.error || "Invalid credentials. Please try again.";
  }

  loading.value = false;
};
</script>