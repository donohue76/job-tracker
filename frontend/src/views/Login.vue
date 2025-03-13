<!-- src/views/Login.vue -->

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-6" elevation="6" width="400">
      <v-card-title class="text-h5 text-center font-weight-bold">
        Login
      </v-card-title>

      <v-divider class="my-3"></v-divider>

      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="usernameOrEmail"
          label="Username or Email"
          variant="outlined"
          density="comfortable"
          clearable
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="outlined"
          density="comfortable"
          clearable
          required
        ></v-text-field>

        <v-btn
          :loading="loading"
          color="primary"
          block
          type="submit"
          class="mt-4"
        >
          Login
        </v-btn>

        <v-alert v-if="errorMessage" type="error" class="mt-3" prominent>
          {{ errorMessage }}
        </v-alert>
      </v-form>

      <v-divider class="my-3"></v-divider>

      <v-card-actions class="justify-center">
        <router-link to="/register" class="text-primary text-decoration-none">
          Need an account? Register
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const usernameOrEmail = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const handleLogin = async () => {
  errorMessage.value = "";
  loading.value = true;

  const result = await authStore.login(usernameOrEmail.value, password.value);
  loading.value = false;

  if (result.success) {
    router.push("/dashboard");
  } else {
    errorMessage.value = result.error || "Login failed. Please try again.";
  }
};
</script>