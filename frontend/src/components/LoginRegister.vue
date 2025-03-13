<!-- src/components/LoginRegister.vue -->

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6 mx-auto" max-width="400">
      <v-card-title class="text-h5 font-weight-bold text-center">
        {{ isLogin ? "Login" : "Register" }}
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field
            v-model="username"
            label="Username"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            required
          ></v-text-field>

          <v-btn type="submit" block color="primary" class="mt-4">
            {{ isLogin ? "Login" : "Register" }}
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn variant="text" color="blue" @click="isLogin = !isLogin">
          {{ isLogin ? "Need an account? Register" : "Already have an account? Login" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const isLogin = ref(true);
const username = ref("");
const password = ref("");

const submitForm = () => {
  console.log(isLogin.value ? "Logging in..." : "Registering...");
};
</script>