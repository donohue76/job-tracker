<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="p-6 bg-white shadow-md rounded-md w-80">
      <h2 class="text-xl font-bold mb-4">Register</h2>

      <ErrorMessage /> <!-- Uses the global error message component -->

      <form @submit.prevent="handleRegister" class="space-y-4">
        <input v-model="username" placeholder="Username" required class="w-full p-2 border rounded-md" />
        <input v-model="email" placeholder="Email" required class="w-full p-2 border rounded-md" />
        <input v-model="password" type="password" placeholder="Password" required class="w-full p-2 border rounded-md" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required class="w-full p-2 border rounded-md" />

        <button
          :disabled="loading"
          class="w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
          {{ loading ? "Registering..." : "Register" }}
        </button>
      </form>

      <p class="mt-4 text-center">
        <router-link to="/login" class="text-blue-500">Already have an account? Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ErrorMessage from "@/components/ErrorMessage.vue"; // Import the error component

export default {
  components: { ErrorMessage }, // Register the component
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const loading = ref(false);

    const handleRegister = async () => {
      authStore.clearError(); // Clear previous errors

      loading.value = true;

      if (password.value !== confirmPassword.value) {
        authStore.errorMessage = "Passwords do not match."; // Set error globally
        loading.value = false;
        return;
      }

      const result = await authStore.register({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      if (result.success) {
        router.push("/login");
      }

      loading.value = false;
    };

    return { username, email, password, confirmPassword, handleRegister, loading };
  }
};
</script>