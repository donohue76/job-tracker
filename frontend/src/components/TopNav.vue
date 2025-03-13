<!-- src/components/TopNav.vue -->

<template>
  <v-app-bar color="primary" density="comfortable">
    <v-text-field
      v-model="searchQuery"
      @input="handleSearch"
      label="Search jobs..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      class="mx-4"
    ></v-text-field>

    <v-spacer></v-spacer>

    <v-menu v-model="showNotifications" offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-badge v-if="unreadNotifications > 0" color="red" content="!" overlap>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
          <v-icon v-else>mdi-bell</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-if="notifications.length === 0">
          <v-list-item-title>No new notifications</v-list-item-title>
        </v-list-item>
        <v-list-item v-for="notification in notifications" :key="notification.id">
          <v-list-item-title>{{ notification.message }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu v-model="showUserMenu" offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar size="32">
            <img :src="userAvatar" alt="User" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/profile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/settings">
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleLogout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const searchQuery = ref("");
const showNotifications = ref(false);
const showUserMenu = ref(false);
const notifications = ref([]);
const unreadNotifications = computed(() => notifications.value.length);
const userAvatar = computed(() => authStore.user?.avatar ?? "https://placehold.co/100x100");

const handleSearch = () => console.log("Searching:", searchQuery.value);
const handleLogout = async () => {
  try {
    await authStore.logout();
    authStore.user = null;
    authStore.accessToken = null;
    authStore.refreshToken = null;
    await nextTick();
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Logout failed. Please try again.");
  }
};
</script>
