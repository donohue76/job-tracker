<!-- src/components/SideNav.vue -->
<template>
  <aside class="w-64 bg-gray-800 text-white min-h-screen">
    <div class="p-4 border-b border-gray-700">
      <h1 class="text-2xl font-bold">Job Tracker</h1>
    </div>
    
    <nav class="mt-4">
      <router-link 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
        :class="{ 'bg-gray-700 text-white': isCurrentRoute(item.path) }"
      >
        <span class="mr-3" v-html="item.icon"></span>
        {{ item.name }}
      </router-link>
    </nav>

    <!-- User Section -->
    <div class="absolute bottom-0 w-64 p-4 border-t border-gray-700" v-if="isAuthenticated">
      <div class="flex items-center space-x-3">
        <img 
          :src="userAvatar" 
          alt="Profile" 
          class="w-10 h-10 rounded-full bg-gray-600"
        >
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-300">{{ userName }}</p>
          <button 
            @click="handleLogout" 
            class="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const navItems = ref([
  { 
    name: 'Dashboard', 
    path: '/dashboard', 
    icon: '📊'
  },
  { 
    name: 'Job Search', 
    path: '/search', 
    icon: '🔍'
  },
  { 
    name: 'Applications', 
    path: '/applications', 
    icon: '📝'
  },
  { 
    name: 'Profile', 
    path: '/profile', 
    icon: '👤'
  }
])

const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.user?.name || 'User')
const userAvatar = computed(() => authStore.user?.avatar || 'https://placehold.co/40x40')

const isCurrentRoute = (path) => route.path === path

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>