<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="p-6 bg-white shadow-md rounded-md w-80">
      <h2 class="text-xl font-bold mb-4">Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="username" placeholder="Username" required class="w-full p-2 border rounded-md" />
        <input v-model="password" type="password" placeholder="Password" required class="w-full p-2 border rounded-md" />
        
        <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Login</button>
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

    const handleLogin = async () => {
      const result = await authStore.login(username.value, password.value);
      if (result.success) {
        router.push('/dashboard'); // Redirect after login
      } else {
        alert(result.error);
      }
    };

    return { username, password, handleLogin };
  }
};
</script>