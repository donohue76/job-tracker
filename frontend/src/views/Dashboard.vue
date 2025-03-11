<!-- src/views/Dashboard.vue-->
<template>
  <div class="flex h-screen">
    <!-- Sidebar Navigation -->
    <SideNav />

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Top Navigation -->
      <TopNav />

      <!-- Main Dashboard Area -->
      <main class="p-6">
        <!-- Recommended Jobs -->
        <section class="mb-8">
          <h3 class="text-xl font-semibold mb-4">Recommended Jobs</h3>
          <JobCarousel />
        </section>

        <!-- Job Applications List -->
        <section>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold">My Applications</h3>
            <select class="rounded-md border-gray-300 shadow-sm p-2">
              <option>Most Recent</option>
              <option>Status</option>
              <option>Alphabetical</option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <JobApplications />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/SideNav.vue";
import TopNav from "@/components/TopNav.vue";
import JobApplications from "@/components/JobApplications.vue";
import JobCarousel from "@/components/JobCarousel.vue";

export default {
  components: {
    SideNav,
    TopNav,
    JobApplications,
    JobCarousel,
  },
};
</script>
