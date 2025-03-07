<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 text-center">Register</h2>
      
      <form @submit.prevent="handleRegister" class="mt-6">
        <div class="mb-4">
          <label class="block text-gray-700">Username</label>
          <input v-model="username" type="text" placeholder="Choose a username"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input v-model="password" type="password" placeholder="Enter a password"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
        </div>

        <p v-if="authStore.errorMessage" class="text-red-500 text-sm text-center mb-4">
          {{ authStore.errorMessage }}
        </p>

        <button type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Register
        </button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        Already have an account?
        <router-link to="/" class="text-blue-600 hover:underline">Login</router-link>
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

const handleRegister = async () => {
  const result = await authStore.register(username.value, password.value);
  if (result.success) {
    router.push('/dashboard');
  }
};
</script>