<!-- src/components/JobApplications.vue-->

<template>
  <v-container>
    <!-- Header & Sorting Options -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <h3 class="text-h5 font-weight-bold">My Applications</h3>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-end">
        <v-select
          v-model="selectedSort"
          :items="sortOptions"
          label="Sort by"
          variant="outlined"
          dense
          class="w-50"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Loading & Error States -->
    <v-progress-circular v-if="jobStore.loading" indeterminate color="primary" class="d-block mx-auto"></v-progress-circular>
    <v-alert v-if="jobStore.error" type="error" class="mt-3">{{ jobStore.error }}</v-alert>

    <!-- Empty State -->
    <v-alert v-if="!jobStore.loading && !jobStore.error && jobStore.jobs.length === 0" type="info" class="mt-3">
      No job applications found.
    </v-alert>

    <!-- Jobs Grid -->
    <v-row v-if="!jobStore.loading && !jobStore.error && jobStore.jobs.length > 0" class="mt-4">
      <v-col v-for="job in sortedJobs" :key="job.id" cols="12" md="6" lg="4">
        <v-card>
          <v-card-title class="font-weight-bold">{{ job.title }}</v-card-title>
          <v-card-subtitle>{{ job.company }}</v-card-subtitle>
          <v-card-text>
            <p class="text-grey">Location: {{ job.location }}</p>
            <p class="text-grey">Applied: {{ formatDate(job.date_applied) }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="openEditModal(job)">Edit</v-btn>
            <v-btn color="error" @click="confirmDelete(job.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Floating Action Button for Adding Jobs -->
    <v-btn fab color="primary" class="fab-button" @click="showAddJobModal = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- Add Job Modal -->
    <v-dialog v-model="showAddJobModal" max-width="500">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold">Add Job Application</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitJob">
            <v-text-field v-model="newJob.title" label="Job Title" required></v-text-field>
            <v-text-field v-model="newJob.company" label="Company" required></v-text-field>
            <v-text-field v-model="newJob.location" label="Location"></v-text-field>
            <v-text-field v-model="newJob.date_applied" label="Date Applied" type="date" required></v-text-field>
            <v-select v-model="newJob.status" :items="statusOptions" label="Application Status" required></v-select>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="showAddJobModal = false">Cancel</v-btn>
              <v-btn color="primary" type="submit">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Edit Job Modal -->
    <v-dialog v-model="showEditModal" max-width="500">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold">Edit Job Application</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveJob">
            <v-text-field v-model="editingJob.title" label="Job Title" required></v-text-field>
            <v-text-field v-model="editingJob.company" label="Company" required></v-text-field>
            <v-text-field v-model="editingJob.location" label="Location"></v-text-field>
            <v-text-field v-model="editingJob.date_applied" label="Date Applied" type="date" required></v-text-field>
            <v-select v-model="editingJob.status" :items="statusOptions" label="Application Status" required></v-select>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="showEditModal = false">Cancel</v-btn>
              <v-btn color="primary" type="submit">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
      :show="showDeleteModal"
      title="Delete Job Application"
      message="Are you sure you want to delete this job application? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      :dangerous="true"
      @close="cancelDelete"
      @confirm="deleteJobApplication"
    />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useJobStore } from "@/stores/jobStore";
import ConfirmationModal from "@/components/shared/ConfirmationModal.vue";

const jobStore = useJobStore();
const showAddJobModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedSort = ref("recent");
const newJob = ref({ title: "", company: "", location: "", date_applied: "", status: "Applied" });
const editingJob = ref(null);
const jobToDelete = ref(null);

const sortOptions = ["Most Recent", "Status", "Alphabetical"];
const statusOptions = ["Applied", "Interview", "Offer", "Rejected", "Withdrawn"];

// Computed property for sorting jobs
const sortedJobs = computed(() => {
  if (selectedSort.value === "Status") return [...jobStore.jobs].sort((a, b) => a.status.localeCompare(b.status));
  if (selectedSort.value === "Alphabetical") return [...jobStore.jobs].sort((a, b) => a.title.localeCompare(b.title));
  return [...jobStore.jobs].sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied));
});

// Convert date into readable format
const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

// Add new job
const submitJob = async () => {
  await jobStore.addJob(newJob.value);
  newJob.value = { title: "", company: "", location: "", date_applied: "", status: "Applied" };
  showAddJobModal.value = false;
};

// Open Edit Job Modal
const openEditModal = (job) => {
  editingJob.value = { ...job };
  showEditModal.value = true;
};

// Save Edited Job
const saveJob = async () => {
  await jobStore.updateJob(editingJob.value);
  showEditModal.value = false;
  editingJob.value = null;
};

// Confirm Delete Job
const confirmDelete = (jobId) => {
  jobToDelete.value = jobId;
  showDeleteModal.value = true;
};

// Cancel Delete Job
const cancelDelete = () => {
  showDeleteModal.value = false;
  jobToDelete.value = null;
};

// Delete Job Application
const deleteJobApplication = async () => {
  await jobStore.deleteJob(jobToDelete.value);
  showDeleteModal.value = false;
};

onMounted(jobStore.fetchJobs);
</script>

<style scoped>
.fab-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>