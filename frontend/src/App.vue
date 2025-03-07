<!-- App.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Side Navigation -->
    <SideNav class="w-64 fixed h-full" />
    
    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Top Navigation -->
      <TopNav class="h-16 bg-white shadow-sm" />
      
      <!-- Main Dashboard Area -->
      <main class="p-6">
        <!-- Job Recommendations Carousel -->
        <section class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Recommended Jobs</h3>
          <JobCarousel />
        </section>
        
        <!-- Job Applications List -->
        <section>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold">My Applications</h3>
            <div class="flex gap-4">
              <select v-model="sortBy" class="rounded-md border-gray-300">
                <option value="date">Most Recent</option>
                <option value="status">Status</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </div>
          </div>
          <JobList :sort-by="sortBy" />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SideNav from './components/SideNav.vue'
import TopNav from './components/TopNav.vue'
import JobCarousel from './components/JobCarousel.vue'
import JobList from './components/JobList.vue'

const sortBy = ref('date')
</script>