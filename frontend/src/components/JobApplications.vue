<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold">My Applications</h3>
      <select v-model="selectedSort" class="rounded-md border-gray-300 shadow-sm p-2">
        <option value="recent">Most Recent</option>
        <option value="status">Status</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="loading" message="Loading your job applications..." />
    <ErrorMessage v-if="error" :message="error" @retry="loadJobs" />

    <!-- Empty State -->
    <div v-if="!loading && !error && isAuthenticated && jobs.length === 0" class="text-center py-8">
      <p class="text-gray-600 mb-4">No job applications found.</p>
      <button @click="showAddJobForm" class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
        Add Your First Job Application
      </button>
    </div>

    <!-- Jobs Grid -->
    <div v-if="!loading && !error && isAuthenticated && jobs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="job in sortedJobs" :key="job.id" class="bg-white rounded-lg shadow-sm border p-4">
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-semibold">{{ job.title }}</h4>
            <p class="text-sm text-gray-600">{{ job.company }}</p>
          </div>
          <span :class="statusClass(job.status)" class="px-2 py-1 rounded-full text-xs font-medium">
            {{ job.status }}
          </span>
        </div>

        <div class="text-sm text-gray-700">{{ job.location }}</div>
        <div class="text-sm text-gray-600">Applied: {{ formatDate(job.date_applied) }}</div>

        <div class="mt-4 flex justify-between">
          <button @click="openEditModal(job)" class="text-sm text-blue-600 hover:text-blue-800">Edit</button>
          <button @click="confirmDelete(job.id)" class="text-sm text-red-600 hover:text-red-800">Delete</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editingJob" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white rounded-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">Edit Job</h3>
        <form @submit.prevent="saveJob">
          <input v-model="editingJob.title" placeholder="Job Title" required class="w-full p-2 border rounded-md mb-2" />
          <input v-model="editingJob.company" placeholder="Company" required class="w-full p-2 border rounded-md mb-2" />
          <input type="date" v-model="editingJob.date_applied" required class="w-full p-2 border rounded-md mb-2" />
          <select v-model="editingJob.status" class="w-full p-2 border rounded-md mb-4">
            <option value="Applied">Applied</option>
            <option value="Interview">Interview Scheduled</option>
            <option value="Offer">Offer Received</option>
            <option value="Rejected">Rejected</option>
            <option value="Withdrawn">Withdrawn</option>
          </select>
          <div class="flex justify-end gap-2">
            <button type="button" @click="closeEditModal" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Save</button>
          </div>
        </form>
      </div>
    </div>

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
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getJobs, updateJob, deleteJob } from "@/api";
import { useAuthStore } from "@/stores/authStore";
import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import ErrorMessage from "@/components/shared/ErrorMessage.vue";
import ConfirmationModal from "@/components/shared/ConfirmationModal.vue";

const authStore = useAuthStore();
const router = useRouter();
const jobs = ref([]);
const editingJob = ref(null);
const selectedSort = ref("recent");
const loading = ref(false);
const error = ref(null);
const showDeleteModal = ref(false);
const jobToDelete = ref(null);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const loadJobs = async () => {
  try {
    loading.value = true;
    error.value = null;
    jobs.value = await getJobs();
  } catch (err) {
    handleError(err);
  } finally {
    loading.value = false;
  }
};

const sortedJobs = computed(() => {
  if (selectedSort.value === "status") return [...jobs.value].sort((a, b) => a.status.localeCompare(b.status));
  if (selectedSort.value === "alphabetical") return [...jobs.value].sort((a, b) => a.title.localeCompare(b.title));
  return [...jobs.value].sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied));
});

const statusClass = (status) => {
  return status === "Applied" ? "bg-blue-100 text-blue-800" :
         status === "Interview" ? "bg-yellow-100 text-yellow-800" :
         status === "Offer" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
};

const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const confirmDelete = (jobId) => {
  jobToDelete.value = jobId;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  jobToDelete.value = null;
};

const deleteJobApplication = async () => {
  try {
    loading.value = true;
    await deleteJob(jobToDelete.value);
    jobs.value = jobs.value.filter((job) => job.id !== jobToDelete.value);
    showDeleteModal.value = false;
  } catch (err) {
    handleError(err);
  } finally {
    loading.value = false;
  }
};

const openEditModal = (job) => {
  editingJob.value = { ...job };
};

const closeEditModal = () => {
  editingJob.value = null;
};

const saveJob = async () => {
  try {
    await updateJob(editingJob.value.id, editingJob.value);
    jobs.value = jobs.value.map((job) =>
      job.id === editingJob.value.id ? { ...editingJob.value } : job
    );
    editingJob.value = null;
  } catch (err) {
    console.error("Failed to update job:", err);
  }
};

onMounted(() => {
  if (isAuthenticated.value) {
    loadJobs();
  }
});
</script>