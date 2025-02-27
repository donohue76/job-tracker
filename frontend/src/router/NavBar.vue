<template>
  <nav class="p-4 bg-blue-600 text-white shadow-md flex justify-between items-center">
    <div>
      <router-link to="/dashboard" class="hover:underline px-4">Job List</router-link>
      <router-link to="/add" class="hover:underline px-4">Add Job</router-link>
    </div>
    <button v-if="authStore.user" @click="handleLogout"
            class="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition">
      Logout
    </button>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
      const result = await authStore.logout();
      if (result.success) {
        router.push('/'); // Redirect to login
      } else {
        alert(result.error);
      }
    };

    return { authStore, handleLogout };
  }
};
</script>