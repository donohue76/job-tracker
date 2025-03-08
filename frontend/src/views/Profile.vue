<!-- src/views/Profile.vue -->
<!-- This view represents the Profile page. It displays the profile settings,
     which include General Information and Job Preferences sections, along with the navigation layout. -->
<script setup>
import { onMounted } from 'vue'
// Import the profile store to manage profile-specific state and actions
import { useProfileStore } from '@/stores/profile'

// Import child components rendering various sections of the profile page
import GeneralInfo from '@/components/profile/GeneralInfo.vue'
import JobPreferences from '@/components/profile/JobPreferences.vue'

// Import navigation components for a consistent page layout
import TopNav from '@/components/TopNav.vue'
import SideNav from '@/components/SideNav.vue'

const profileStore = useProfileStore()

// When the component is mounted, fetch the profile data via Pinia store action
onMounted(() => {
  profileStore.fetchProfile()
})
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Navigation -->
    <SideNav />

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Navigation Bar -->
      <TopNav />

      <!-- Main Content Area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto px-6 py-8">
          <h1 class="text-2xl font-semibold mb-6">Profile Settings</h1>
          
          <!-- Display a loader if the profile is still loading -->
          <div v-if="profileStore.loading" class="text-center py-4">
            Loading...
          </div>
          
          <!-- Once loaded, display the General Information and Job Preferences sections -->
          <div v-else>
            <GeneralInfo />
            <JobPreferences />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>