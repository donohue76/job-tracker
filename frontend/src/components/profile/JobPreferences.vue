<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Job Preferences</h2>
    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-2 gap-6">
        <!-- Desired Role Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Desired Role</label>
          <input
            v-model="profile.desired_role"
            type="text"
            placeholder="Frontend Developer"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <!-- Preferred Location Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
          <input
            v-model="profile.preferred_location"
            type="text"
            placeholder="Remote / City Name"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <!-- Salary Range Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
          <input
            v-model="profile.salary_range"
            type="text"
            placeholder="$90k - $120k"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <!-- Industry Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Industry</label>
          <input
            v-model="profile.industry"
            type="text"
            placeholder="Tech, Finance, etc."
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      <!-- Save Button -->
      <div class="mt-6 flex items-center">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Saving...' : 'Save Job Preferences' }}
        </button>
        <span v-if="error" class="ml-4 text-red-600">{{ error }}</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useProfileStore()
const { profile, loading, error } = storeToRefs(store)

// Fetch profile data when component mounts
onMounted(async () => {
  await store.fetchProfile()
})

// Handle form submission
async function handleSubmit() {
  const success = await store.updateProfile({
    desired_role: profile.value.desired_role,
    preferred_location: profile.value.preferred_location,
    salary_range: profile.value.salary_range,
    industry: profile.value.industry
  })
  
  if (success) {
    alert('Job Preferences Saved Successfully!')
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>