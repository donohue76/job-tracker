<!-- src/components/SideNav.vue -->

<template>
  <v-navigation-drawer app color="grey-darken-3">
    <v-list density="compact">
      <v-list-item title="JobTracker" class="text-h6 font-weight-bold px-4 py-3"></v-list-item>
      <v-divider></v-divider>

      <v-list-item
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        link
        :class="{ 'bg-primary text-white': $route.path === item.path }"
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- User Info Section -->
    <v-list v-if="isAuthenticated">
      <v-list-item>
        <v-avatar>
          <img :src="userAvatar" />
        </v-avatar>
        <v-list-item-title>{{ userName }}</v-list-item-title>
        <v-btn variant="text" color="error" @click="handleLogout">Logout</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: "mdi-view-dashboard" },
  { name: "Job Search", path: "/search", icon: "mdi-magnify" },
  { name: "Applications", path: "/applications", icon: "mdi-briefcase" },
  { name: "Profile", path: "/profile", icon: "mdi-account" },
];

const isAuthenticated = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.user?.name || "User");
const userAvatar = computed(() => authStore.user?.avatar || "https://placehold.co/100x100");

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>