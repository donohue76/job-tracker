<script setup>
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <NavBar />
  <div class="p-6">
    <RouterView />
  </div>
</template>

<style scoped>
/* Minimal custom styling since Tailwind handles most of it */
</style>