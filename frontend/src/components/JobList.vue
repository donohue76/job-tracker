<template>
  <div class="p-4 bg-blue-500 text-white text-center hover:bg-red-500">
  Hover me to test Tailwind!
  </div>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-4 text-center">Job Applications</h2>
    <ul class="space-y-4">
      <li v-for="job in jobs" :key="job.id"
          class="p-4 bg-gray-100 rounded-md shadow hover:bg-blue-500 hover:scale-105 hover:border-blue-700 transition-all">
        <div>
          <h3 class="font-semibold text-lg">{{ job.title }} at {{ job.company }}</h3>
          <p class="text-sm text-gray-600">
            Status:
            <span :class="statusClass(job.status)" class="px-3 py-1 text-sm font-semibold rounded-full">
              {{ job.status }}
            </span>
          </p>
        </div>

        <div class="flex space-x-2">
          <button @click="editJob(job)"
                  class="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition">
            Edit
          </button>
          <button @click="deleteJob(job.id)"
                  class="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition">
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Edit Form (Visible Only When Editing) -->
    <div v-if="editingJob" class="mt-6 p-6 bg-gray-200 rounded-md">
      <h3 class="text-lg font-bold mb-2">Edit Job</h3>
      <form @submit.prevent="saveJob">
        <input v-model="editingJob.title" placeholder="Job Title" required class="w-full p-2 border rounded-md" />
        <input v-model="editingJob.company" placeholder="Company" required class="w-full p-2 border rounded-md mt-2" />
        <input type="date" v-model="editingJob.date_applied" required class="w-full p-2 border rounded-md mt-2" />
        
        <select v-model="editingJob.status" class="w-full p-2 border rounded-md mt-2">
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interview Scheduled</option>
          <option value="Offer">Offer Received</option>
          <option value="Rejected">Rejected</option>
          <option value="Withdrawn">Withdrawn</option>
        </select>

        <div class="mt-4 flex space-x-2">
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600">
            Save
          </button>
          <button @click="cancelEdit" class="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getJobs, updateJob, deleteJob } from '@/api';

export default {
  data() {
    return {
      jobs: [],
      editingJob: null,
    };
  },

  async created() {
    this.jobs = await getJobs();
  },
  methods: {
    statusClass(status) {
      const statusColors = {
        Applied: "bg-blue-100 text-blue-700",
        Interviewing: "bg-yellow-100 text-yellow-700",
        Offer: "bg-green-100 text-green-700",
        Rejected: "bg-red-100 text-red-700",
        Withdrawn: "bg-gray-300 text-gray-700",
      };
      return statusColors[status] || "bg-gray-100 text-gray-700";
    },

    async deleteJob(jobId) {
      if (confirm('Are you sure you want to delete this job?')) {
        await deleteJob(jobId);
        this.jobs = this.jobs.filter(job => job.id !== jobId);
      }
    },

    editJob(job) {
      this.editingJob = { ...job };
    },

    async saveJob() {
      console.log("🛠 Sending updated job data:", this.editingJob);
      try {
        await updateJob(this.editingJob.id, this.editingJob);
        this.jobs = this.jobs.map(job => 
          job.id === this.editingJob.id ? { ...this.editingJob } : job
        );
        this.editingJob = null;
      } catch (error) {
        console.error("🚨 Error updating job:", error);
      }
    },

    cancelEdit() {
      this.editingJob = null;
    }
  }
};
</script>