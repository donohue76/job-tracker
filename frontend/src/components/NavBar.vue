<template>
  <nav class="p-4 bg-blue-600 text-white shadow-md flex justify-between items-center">
    <div v-if="authStore.user">
      <router-link to="/dashboard" class="hover:underline px-4">Job List</router-link>
      <router-link to="/add" class="hover:underline px-4">Add Job</router-link>
    </div>
    <button v-if="authStore.user" @click="handleLogout"
            class="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition">
      Logout
    </button>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  const result = await authStore.logout();
  if (result.success) {
    console.log("Logout successful. Redirecting to login...");
    
    // Force a full page reload to ensure Vue state resets properly
    window.location.href = "/"; 
  } else {
    alert(result.error);
  }
};
</script>