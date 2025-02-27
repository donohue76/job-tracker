<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="p-6 bg-white shadow-md rounded-md w-80">
      <h2 class="text-xl font-bold mb-4">Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="username" placeholder="Username" required class="w-full p-2 border rounded-md" />
        <input v-model="password" type="password" placeholder="Password" required class="w-full p-2 border rounded-md" />
        
        <button 
          :disabled="loading"
          class="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
          {{ loading ? "Logging in..." : "Login" }}
        </button>

        <!-- ✅ Error message is added below the login button -->
        <p v-if="errorMessage" class="text-red-500 bg-red-100 border border-red-400 text-sm mt-2 p-2 rounded-md">
          {{ errorMessage }}
        </p>
      </form>

      <p class="mt-4 text-center">
        <router-link to="/register" class="text-blue-500">Need an account? Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const loading = ref(false);

    const handleLogin = async () => {
      errorMessage.value = ''; // Clear previous errors
      loading.value = true;

      try {
        const result = await authStore.login(username.value, password.value);
        
        if (result.success) {
          router.push('/dashboard');
        } else {
          // Handle different HTTP errors with specific messages
          if (result.error && typeof result.error === 'object') {
            if (result.error.error) {
              errorMessage.value = result.error.error; // API message (e.g., "Invalid credentials")
            } else if (result.error.detail) {
              errorMessage.value = result.error.detail; // Generic API error
            } else {
              errorMessage.value = "Login failed. Please check your credentials.";
            }
          } else {
            errorMessage.value = result.error || "Login failed. Please try again.";
          }
        }
      } catch (error) {
        // Handle network errors or server downtime
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage.value = "Invalid input. Please check your username and password.";
              break;
            case 401:
              errorMessage.value = "Unauthorized. Please check your login details.";
              break;
            case 403:
              errorMessage.value = "Access denied.";
              break;
            case 500:
              errorMessage.value = "Server error. Please try again later.";
              break;
            default:
              errorMessage.value = "An unknown error occurred.";
          }
        } else {
          errorMessage.value = "Network error. Please check your internet connection.";
        }
      } finally {
        loading.value = false;
      }
    };

    return { username, password, handleLogin, errorMessage, loading };
  }
};
</script>