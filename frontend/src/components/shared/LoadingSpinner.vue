<!-- src/components/shared/LoadingSpinner.vue -->

<template>
  <div class="flex items-center justify-center p-4">
    <v-progress-circular 
      indeterminate 
      color="primary" 
      size="32" 
      class="mr-3"
    />
    <span v-if="message" class="text-gray-600">{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  }
});
</script>