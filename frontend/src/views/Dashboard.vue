<!-- src/views/Dashboard.vue -->
<template>
  <div class="min-h-screen flex bg-gray-100">
    <SideNav />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopNav />
      <main class="flex-1 p-8 overflow-y-auto">
        <div class="max-w-7xl mx-auto">
          <JobCarousel />
          <section class="mt-8">
            <JobApplications />
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import SideNav from '@/components/SideNav.vue'
import TopNav from '@/components/TopNav.vue'
import JobCarousel from '@/components/JobCarousel.vue'
import JobApplications from '@/components/JobApplications.vue'
</script>