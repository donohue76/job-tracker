<!--src/views/Dashboard.vue-->

<template>
  <v-container fluid class="fill-height">
    <h1 class="text-h4 font-weight-bold mb-6">Job Dashboard</h1>

    <!-- Recommended Jobs Section -->
    <v-sheet class="mb-8 pa-4 rounded-lg elevation-2">
      <v-row class="mb-4 align-center justify-space-between">
        <h3 class="text-h5 font-weight-bold">Recommended Jobs</h3>
      </v-row>

      <v-slide-group show-arrows>
        <v-slide-group-item
          v-for="job in recommendedJobs"
          :key="job.id"
          class="mr-4"
        >
          <v-card class="pa-4 rounded-lg elevation-1" width="250">
            <v-card-title class="font-weight-bold">{{ job.title }}</v-card-title>
            <v-card-subtitle class="text-grey-darken-1">{{ job.company }}</v-card-subtitle>
            <v-card-text>
              <p class="text-grey-darken-2"><v-icon>mdi-map-marker</v-icon> {{ job.location }}</p>
              <p class="text-grey-darken-2"><v-icon>mdi-currency-usd</v-icon> {{ job.salary }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn variant="text" color="primary">View</v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- Applications Section -->
    <v-sheet class="pa-4 rounded-lg elevation-2">
      <v-row class="mb-4 align-center justify-space-between">
        <h3 class="text-h5 font-weight-bold">My Applications</h3>
        <v-select
          v-model="selectedSort"
          :items="sortOptions"
          label="Sort by"
          variant="outlined"
          dense
        ></v-select>
      </v-row>

      <v-row>
        <v-col v-for="job in sortedApplications" :key="job.id" cols="12" md="6" lg="4">
          <v-card class="pa-4 rounded-lg elevation-1">
            <v-card-title class="font-weight-bold">{{ job.title }}</v-card-title>
            <v-card-subtitle class="text-grey-darken-1">{{ job.company }}</v-card-subtitle>
            <v-card-text>
              <p class="text-grey-darken-2"><v-icon>mdi-map-marker</v-icon> {{ job.location }}</p>
              <p class="text-grey-darken-2"><v-icon>mdi-calendar</v-icon> Applied: {{ job.appliedDate }}</p>
            </v-card-text>
            <v-card-actions>
              <StatusBadge :status="job.status" />
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text">View</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";

const selectedSort = ref("date");
const sortOptions = ["Most Recent", "Status", "Alphabetical"];

const recommendedJobs = ref([
  { id: 1, title: "Senior Frontend Developer", company: "TechCorp", location: "Remote", salary: "$120k - $150k" },
  { id: 2, title: "Full Stack Engineer", company: "StartupX", location: "San Francisco", salary: "$130k - $160k" },
  { id: 3, title: "React Developer", company: "BigTech", location: "New York", salary: "$110k - $140k" },
]);

const applications = ref([
  { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote", status: "Applied", appliedDate: "2024-03-05" },
  { id: 2, title: "Software Engineer", company: "StartupX", location: "San Francisco", status: "Interview", appliedDate: "2024-03-03" },
]);

const sortedApplications = computed(() => {
  if (selectedSort.value === "Status") {
    return [...applications.value].sort((a, b) => a.status.localeCompare(b.status));
  }
  if (selectedSort.value === "Alphabetical") {
    return [...applications.value].sort((a, b) => a.title.localeCompare(b.title));
  }
  return [...applications.value].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
});
</script>