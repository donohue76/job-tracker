<!--src.App.vue-->

<template>
  <v-app>
    <!-- Sidebar Navigation -->
    <SideNav />

    <v-main>
      <!-- Top Navigation -->
      <TopNav />

      <!-- Main Content -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import SideNav from "@/components/SideNav.vue";
import TopNav from "@/components/TopNav.vue";
</script>