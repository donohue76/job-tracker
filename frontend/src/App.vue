<script setup>
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Left Navigation Panel (Fixed) -->
    <NavBar />

    <!-- Main Content Area -->
    <div class="flex-1 ml-64 p-6 overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
/* Ensures the main content is pushed to the right of the fixed sidebar */
</style>