<!-- src/components/JobCarousel.vue -->
<template>
  <section class="mb-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Recommended Jobs</h2>
      <div class="flex space-x-2">
        <button 
          @click="previousPage" 
          :disabled="currentPage === 0"
          class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          ←
        </button>
        <button 
          @click="nextPage" 
          :disabled="currentPage >= maxPages"
          class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="n in 3" :key="n" class="bg-white p-6 rounded-lg shadow animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
      <p class="font-bold">Error loading recommended jobs</p>
      <p class="text-sm">{{ error }}</p>
      <button 
        @click="loadRecommendedJobs" 
        class="mt-2 text-sm text-red-700 hover:text-red-800"
      >
        Try again
      </button>
    </div>

    <!-- Jobs Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        v-for="job in displayedJobs" 
        :key="job.id" 
        class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-medium text-lg">{{ job.title }}</h3>
            <p class="text-gray-600">{{ job.company }}</p>
          </div>
          <button 
            @click="toggleSaved(job)"
            class="text-gray-400 hover:text-yellow-500"
            :class="{ 'text-yellow-500': job.saved }"
          >
            ⭐
          </button>
        </div>
        
        <div class="mt-4 space-y-2">
          <div class="flex items-center text-sm text-gray-600">
            <span class="mr-2">📍</span>
            {{ job.location }}
          </div>
          <div class="flex items-center text-sm text-gray-600">
            <span class="mr-2">💰</span>
            {{ job.salary }}
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <span 
            v-for="tag in job.tags" 
            :key="tag"
            class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
          >
            {{ tag }}
          </span>
        </div>

        <div class="mt-4 flex justify-between items-center">
          <span class="text-sm text-gray-500">
            Posted {{ formatDate(job.postedDate) }}
          </span>
          <button 
            @click="applyToJob(job)"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const loading = ref(false)
const error = ref(null)
const jobs = ref([])
const currentPage = ref(0)
const itemsPerPage = 3

const displayedJobs = computed(() => {
  const start = currentPage.value * itemsPerPage
  return jobs.value.slice(start, start + itemsPerPage)
})

const maxPages = computed(() => Math.ceil(jobs.value.length / itemsPerPage) - 1)

const loadRecommendedJobs = async () => {
  try {
    loading.value = true
    error.value = null
    // Replace with your API call
    const response = await fetch('/api/recommended-jobs')
    jobs.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Failed to load recommended jobs:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

const toggleSaved = async (job) => {
  try {
    // Replace with your API call
    await fetch(`/api/jobs/${job.id}/save`, {
      method: job.saved ? 'DELETE' : 'POST'
    })
    job.saved = !job.saved
  } catch (err) {
    console.error('Failed to toggle job save status:', err)
  }
}

const applyToJob = (job) => {
  // Implement application logic
  console.log('Applying to job:', job.title)
}

const previousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < maxPages.value) {
    currentPage.value++
  }
}

onMounted(() => {
  loadRecommendedJobs()
})
</script>