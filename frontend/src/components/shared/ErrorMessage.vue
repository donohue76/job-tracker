<!-- src/components/shared/ErrorMessage.vue -->

<template>
  <v-alert 
    v-if="authStore.errorMessage" 
    type="error" 
    prominent 
    closable 
    @update:model-value="authStore.clearError"
    class="mb-4"
  >
    {{ authStore.errorMessage }}
  </v-alert>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
</script>