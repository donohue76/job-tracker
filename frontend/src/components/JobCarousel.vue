<!-- src/components/JobCarousel.vue -->

<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title class="text-h5 font-weight-bold">Recommended Jobs</v-card-title>

      <v-row class="align-center justify-between mb-4">
        <v-btn 
          @click="previousPage"
          :disabled="currentPage === 0"
          icon
          color="primary"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn 
          @click="nextPage"
          :disabled="currentPage >= maxPages"
          icon
          color="primary"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>

      <!-- Loading & Error States -->
      <LoadingSpinner v-if="loading" message="Fetching recommended jobs..." />
      <ErrorMessage v-if="error" :message="error" @retry="loadRecommendedJobs" />

      <!-- Jobs Grid -->
      <v-row v-if="!loading && !error && jobs.length > 0">
        <v-col v-for="job in displayedJobs" :key="job.id" cols="12" md="6" lg="4">
          <v-card class="pa-4">
            <v-card-title class="font-weight-bold">
              {{ job.title }}
            </v-card-title>
            <v-card-subtitle class="text-grey-darken-1">
              {{ job.company }}
            </v-card-subtitle>

            <v-card-text>
              <div class="text-sm text-grey-darken-2">
                <v-icon size="18">mdi-map-marker</v-icon> {{ job.location }}
              </div>
              <div class="text-sm text-grey-darken-2">
                <v-icon size="18">mdi-currency-usd</v-icon> {{ job.salary }}
              </div>

              <v-chip-group class="mt-2">
                <v-chip
                  v-for="tag in job.tags"
                  :key="tag"
                  color="primary"
                  variant="outlined"
                  size="small"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn
                icon
                :color="job.saved ? 'yellow-darken-2' : 'grey'"
                @click="toggleSaved(job)"
              >
                <v-icon>{{ job.saved ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn color="blue-darken-1" @click="applyToJob(job)">Apply</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- No Jobs Found -->
      <v-alert v-if="!loading && !error && jobs.length === 0" type="info" class="mt-4">
        No recommended jobs available at the moment.
      </v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import ErrorMessage from "@/components/shared/ErrorMessage.vue";

const loading = ref(false);
const error = ref(null);
const jobs = ref([]);
const currentPage = ref(0);
const itemsPerPage = 3;

const displayedJobs = computed(() => {
  const start = currentPage.value * itemsPerPage;
  return jobs.value.slice(start, start + itemsPerPage);
});

const maxPages = computed(() => Math.ceil(jobs.value.length / itemsPerPage) - 1);

const loadRecommendedJobs = async () => {
  try {
    loading.value = true;
    const response = await fetch("http://127.0.0.1:8000/api/recommended-jobs");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    jobs.value = await response.json();
  } catch (err) {
    error.value = `Failed to load jobs: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

const toggleSaved = async (job) => {
  try {
    await fetch(`/api/jobs/${job.id}/save`, {
      method: job.saved ? "DELETE" : "POST",
    });
    job.saved = !job.saved;
  } catch (err) {
    console.error("Failed to toggle job save status:", err);
  }
};

const applyToJob = (job) => {
  console.log("Applying to job:", job.title);
};

const previousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < maxPages.value) {
    currentPage.value++;
  }
};

onMounted(() => {
  loadRecommendedJobs();
});
</script>