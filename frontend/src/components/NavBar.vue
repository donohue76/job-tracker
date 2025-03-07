<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const menuItems = ref([
  { name: "Dashboard", path: "/" },
  { name: "Job Applications", path: "/jobs" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
]);
</script>

<template>
  <div class="w-64 bg-white shadow-lg h-full fixed top-0 left-0 flex flex-col p-4">
    <h1 class="text-xl font-bold mb-6 text-center">Job Tracker</h1>

    <nav>
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.path">
          <button 
            @click="router.push(item.path)"
            class="w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 transition"
          >
            {{ item.name }}
          </button>
        </li>
      </ul>
    </nav>

    <div class="mt-auto">
      <button class="w-full bg-red-500 text-white py-2 rounded-md mt-6 hover:bg-red-600 transition">
        Logout
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Makes sure the sidebar stays fixed to the left */
</style>