<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="p-6 bg-white shadow-md rounded-md w-80">
      <h2 class="text-xl font-bold mb-4">Register</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <input v-model="username" placeholder="Username" required class="w-full p-2 border rounded-md" />
        <input v-model="password" type="password" placeholder="Password" required class="w-full p-2 border rounded-md" />

        <button class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Register</button>
      </form>

      <p class="mt-4 text-center">
        <router-link to="/login" class="text-blue-500">Already have an account? Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const handleRegister = async () => {
      try {
        await axios.post('http://127.0.0.1:8000/api/auth/register/', {
          username: username.value,
          password: password.value
        });
        alert('Registration successful! Please log in.');
        router.push('/login');
      } catch (error) {
        alert('Registration failed: ' + error.response?.data || error.message);
      }
    };

    return { username, password, handleRegister };
  }
};
</script>