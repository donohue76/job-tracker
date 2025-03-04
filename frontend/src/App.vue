<script setup>
import { RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div>
    <NavBar />
    <div class="p-6">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
/* Minimal custom styling since Tailwind handles most of it */
</style>