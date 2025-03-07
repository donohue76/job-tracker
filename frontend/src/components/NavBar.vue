<template>
  <nav class="p-4 bg-blue-600 text-white shadow-md flex justify-between items-center">
    <div class="flex space-x-4">
      <router-link to="/dashboard" class="hover:bg-blue-700 px-4 py-2 rounded-md transition">
        🏠 Dashboard
      </router-link>
      <router-link to="/add" class="hover:bg-blue-700 px-4 py-2 rounded-md transition">
        ➕ Add Job
      </router-link>
    </div>
    <button v-if="authStore.user" @click="handleLogout"
            class="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition">
      🚪 Logout
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
    window.location.href = "/";
  }
};
</script>