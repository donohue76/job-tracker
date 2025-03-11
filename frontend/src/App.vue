<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Side Navigation -->
    <SideNav />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navigation -->
      <TopNav />

      <!-- Page Content -->
      <div class="p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SideNav from "@/components/SideNav.vue";
import TopNav from "@/components/TopNav.vue";
</script>

<style scoped>
/* Minimal custom styling since Tailwind handles most of it */
</style>