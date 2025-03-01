<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="p-6 bg-white shadow-md rounded-md w-96">
      <h2 class="text-xl font-bold mb-4">My Profile</h2>

      <form @submit.prevent="updateProfile" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Username</label>
          <input v-model="username" class="w-full p-2 border rounded-md" disabled />
        </div>

        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="email" class="w-full p-2 border rounded-md" />
        </div>

        <div>
          <label class="block text-sm font-medium">New Password</label>
          <input v-model="password" type="password" class="w-full p-2 border rounded-md" />
        </div>

        <button 
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? "Updating..." : "Update Profile" }}
        </button>

        <p v-if="errorMessage" class="text-red-500 bg-red-100 border border-red-400 text-sm mt-2 p-2 rounded-md">
          {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="text-green-500 bg-green-100 border border-green-400 text-sm mt-2 p-2 rounded-md">
          {{ successMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getUserProfile, updateUserProfile } from "@/api";

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");
    const loading = ref(false);

    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response?.user) {
          username.value = response.user.username;
          email.value = response.user.email;
        } else {
          throw new Error("Invalid response from server.");
        }
      } catch (error) {
        errorMessage.value = error.response?.data?.message || error.message || "Failed to load profile.";
      }
    };

    const updateProfile = async () => {
      errorMessage.value = "";
      successMessage.value = "";
      loading.value = true;

      try {
        const payload = { email: email.value };
        if (password.value) {
          payload.password = password.value;
        }

        const response = await updateUserProfile(payload);
        if (response?.success) {
          successMessage.value = "Profile updated successfully!";
          password.value = ""; // Clear password field after update
        } else {
          throw new Error(response?.message || "Profile update failed.");
        }
      } catch (error) {
        errorMessage.value = error.response?.data?.message || error.message || "Failed to update profile.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchProfile);

    return { username, email, password, updateProfile, errorMessage, successMessage, loading };
  }
};
</script>