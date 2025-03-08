<!-- src/views/NotFound.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Page not found</p>
      <router-link 
        to="/dashboard" 
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Return to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup>
// No additional setup needed
</script>