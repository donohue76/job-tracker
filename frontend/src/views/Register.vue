<!-- src/views/Register.vue -->

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-6" elevation="6" width="400">
      <v-card-title class="text-h5 text-center font-weight-bold">
        Register
      </v-card-title>

      <v-divider class="my-3"></v-divider>

      <v-form @submit.prevent="handleRegister">
        <v-text-field
          v-model="username"
          label="Username"
          variant="outlined"
          density="comfortable"
          clearable
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="Email"
          type="email"
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

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          density="comfortable"
          clearable
          required
        ></v-text-field>

        <v-btn
          :loading="loading"
          color="success"
          block
          type="submit"
          class="mt-4"
        >
          Register
        </v-btn>

        <v-alert v-if="errorMessage" type="error" class="mt-3" prominent>
          {{ errorMessage }}
        </v-alert>
      </v-form>

      <v-divider class="my-3"></v-divider>

      <v-card-actions class="justify-center">
        <router-link to="/login" class="text-primary text-decoration-none">
          Already have an account? Login
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

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const loading = ref(false);

const handleRegister = async () => {
  authStore.clearError();
  errorMessage.value = "";
  loading.value = true;

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    loading.value = false;
    return;
  }

  const result = await authStore.register({
    username: username.value,
    email: email.value,
    password: password.value,
  });

  loading.value = false;

  if (result.success) {
    router.push("/login");
  } else {
    errorMessage.value = result.error || "Registration failed. Please try again.";
  }
};
</script>