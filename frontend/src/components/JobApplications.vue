<!-- src/components/JobApplications.vue -->
<template>
  <div class="p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-xl font-semibold mb-4">My Applications</h2>
    
    <!-- Loading State -->
    <LoadingSpinner 
      v-if="loading" 
      message="Loading your job applications..." 
    />

    <!-- Error State -->
    <ErrorMessage
      v-if="error"
      :message="error"
      retry
      @retry="retryLoading"
    />

    <!-- Not Authenticated State -->
    <div v-if="!isAuthenticated" class="text-center py-8">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m0 0v2m0-2h2m-2 0H8m4-6v2m0 0v2m0-2h2m-2 0H8m4-6V7m0 0V5m0 2h2M8 7h4"/>
      </svg>
      <p class="text-gray-600 mb-4">Please log in to view your job applications.</p>
      <router-link 
        to="/login" 
        class="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Log In
      </router-link>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !error && isAuthenticated && jobs.length === 0" class="text-center py-8">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <p class="text-gray-600 mb-4">No job applications found.</p>
      <button 
        @click="showAddJobForm" 
        class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Add Your First Job Application
      </button>
    </div>

    <!-- Jobs List -->
    <ul v-if="!loading && !error && isAuthenticated && jobs.length > 0" class="space-y-4">
      <li 
        v-for="job in jobs" 
        :key="job.id"
        class="p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-lg">{{ job.title }} at {{ job.company }}</h3>
            <p class="text-sm text-gray-600 mt-1">Applied: {{ new Date(job.date_applied).toLocaleDateString() }}</p>
          </div>
          <StatusBadge :status="job.status" />
        </div>

        <div class="mt-4 flex space-x-2">
          <button 
            @click="editJob(job)"
            class="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button 
            @click="deleteJob(job.id)"
            class="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Edit Form -->
    <div v-if="editingJob" class="mt-6 p-6 bg-gray-200 rounded-md">
      <h3 class="text-lg font-bold mb-2">Edit Job</h3>
      <form @submit.prevent="saveJob">
        <input 
          v-model="editingJob.title" 
          placeholder="Job Title" 
          required 
          class="w-full p-2 border rounded-md"
        />
        <input 
          v-model="editingJob.company" 
          placeholder="Company" 
          required 
          class="w-full p-2 border rounded-md mt-2"
        />
        <input 
          type="date" 
          v-model="editingJob.date_applied" 
          required 
          class="w-full p-2 border rounded-md mt-2"
        />
        
        <select 
          v-model="editingJob.status" 
          class="w-full p-2 border rounded-md mt-2"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview Scheduled</option>
          <option value="Offer">Offer Received</option>
          <option value="Rejected">Rejected</option>
          <option value="Withdrawn">Withdrawn</option>
        </select>

        <div class="mt-4 flex space-x-2">
          <button 
            type="submit" 
            :disabled="saving"
            class="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : 'Save' }}
          </button>
          <button 
            @click="cancelEdit" 
            :disabled="saving"
            class="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
      v-model="showDeleteModal"
      title="Delete Job Application"
      message="Are you sure you want to delete this job application? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      :dangerous="true"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import { getJobs, updateJob, deleteJob } from '@/api';
import { useAuthStore } from '@/stores/authStore';
import { computed } from 'vue';
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue';
import ErrorMessage from '@/components/shared/ErrorMessage.vue';
import StatusBadge from '@/components/shared/StatusBadge.vue';
import ConfirmationModal from '@/components/shared/ConfirmationModal.vue';

export default {
  components: {
    LoadingSpinner,
    ErrorMessage,
    StatusBadge,
    ConfirmationModal
  },
  
  data() {
    return {
      jobs: [],
      editingJob: null,
      loading: false,
      saving: false,
      error: null,
      showDeleteModal: false,
      jobToDelete: null
    };
  },

  setup() {
    const authStore = useAuthStore();
    return {
      isAuthenticated: computed(() => authStore.isAuthenticated)
    };
  },

  async created() {
    if (!this.isAuthenticated) {
      this.error = "Please log in to view jobs";
      return;
    }
    await this.loadJobs();
  },

  methods: {
    async loadJobs() {
      try {
        this.loading = true;
        this.error = null;
        this.jobs = await getJobs();
      } catch (err) {
        this.handleError(err);
      } finally {
        this.loading = false;
      }
    },

    async retryLoading() {
      await this.loadJobs();
    },

    handleError(err) {
      if (err.response?.status === 401) {
        const authStore = useAuthStore();
        authStore.logout();
        this.error = "Session expired. Please log in again.";
      } else {
        this.error = err.message || 'Failed to load jobs';
      }
      console.error('Error:', err);
    },

    showAddJobForm() {
      this.$router.push('/jobs/new');
    },

    deleteJob(jobId) {
      this.jobToDelete = jobId;
      this.showDeleteModal = true;
    },

    async confirmDelete() {
      try {
        this.loading = true;
        await deleteJob(this.jobToDelete);
        this.jobs = this.jobs.filter(job => job.id !== this.jobToDelete);
        this.showDeleteModal = false;
      } catch (err) {
        this.handleError(err);
      } finally {
        this.loading = false;
      }
    },

    editJob(job) {
      this.editingJob = { ...job };
    },

    async saveJob() {
      try {
        this.saving = true;
        this.error = null;
        await updateJob(this.editingJob.id, this.editingJob);
        this.jobs = this.jobs.map(job => 
          job.id === this.editingJob.id ? { ...this.editingJob } : job
        );
        this.editingJob = null;
      } catch (err) {
        this.handleError(err);
      } finally {
        this.saving = false;
      }
    },

    cancelEdit() {
      this.editingJob = null;
    }
  }
};
</script>