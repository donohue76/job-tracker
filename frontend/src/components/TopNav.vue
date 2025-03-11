<!-- src/components/TopNav.vue -->
<template>
  <header class="bg-white shadow-sm">
    <div class="flex justify-between items-center px-6 py-4">
      <!-- Search Section -->
      <div class="flex-1 max-w-xl">
        <div class="relative">
          <input 
            type="search" 
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Search jobs..."
            class="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
          <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center space-x-6">
        <!-- Notifications -->
        <div class="relative">
          <button 
            @click="toggleNotifications"
            class="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span class="text-xl">🔔</span>
            <span 
              v-if="unreadNotifications > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
            >
              {{ unreadNotifications }}
            </span>
          </button>
          
          <!-- Notifications Dropdown -->
          <div 
            v-if="showNotifications"
            class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <div v-if="notifications.length === 0" class="px-4 py-2 text-gray-600">
              No new notifications
            </div>
            <div 
              v-for="notification in notifications" 
              :key="notification.id"
              class="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              {{ notification.message }}
            </div>
          </div>
        </div>

        <!-- User Menu -->
        <div class="relative">
          <button 
            @click="toggleUserMenu"
            class="flex items-center space-x-2 focus:outline-none"
          >
            <img 
              :src="userAvatar" 
              alt="Profile" 
              class="w-8 h-8 rounded-full"
            >
            <span class="text-gray-700">{{ userName }}</span>
          </button>

          <!-- User Dropdown -->
          <div 
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <router-link 
              to="/profile"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Profile
            </router-link>

            <router-link 
              to="/settings"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Settings
            </router-link>

            <!-- 🔽 Logout Button -->
            <button 
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)
const notifications = ref([])
const unreadNotifications = computed(() => notifications.value.filter(n => !n.read).length)

const userName = computed(() => authStore.user?.username || 'User');
const userAvatar = computed(() => authStore.user?.avatar ?? 'https://placehold.co/100x100');

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const handleSearch = () => {
  // Implement search functionality
  console.log('Searching:', searchQuery.value)
}

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Logout failed. Please try again.");
  }
};

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showNotifications.value = false
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>