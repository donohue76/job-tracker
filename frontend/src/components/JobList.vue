<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-4 text-center">Job Applications</h2>
    <ul class="space-y-4">
      <li v-for="job in jobs" :key="job.id"
          class="p-4 bg-gray-100 rounded-md shadow hover:bg-blue-500 hover:scale-105 transition-all">
        <div>
          <h3 class="font-semibold text-lg">{{ job.position }} at {{ job.company }}</h3>
          <p class="text-sm text-gray-600">
            <span :class="statusClass(job.decision_status)" class="px-3 py-1 text-sm font-semibold rounded-full">
              {{ formatStatus(job.decision_status) }} {{ formatStatusDate(job) }}
            </span>
          </p>
        </div>

        <div class="flex space-x-2 mt-2">
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

    <!-- Edit Form -->
    <div v-if="editingJob" class="mt-6 p-6 bg-gray-200 rounded-md">
      <h3 class="text-lg font-bold mb-2">Edit Job</h3>
      <form @submit.prevent="saveJob">
        <input v-model="editingJob.position" placeholder="Job Title" required class="w-full p-2 border rounded-md" />
        <input v-model="editingJob.company" placeholder="Company" required class="w-full p-2 border rounded-md mt-2" />
        <input type="date" v-model="editingJob.applied_date" required class="w-full p-2 border rounded-md mt-2" />
        
        <!-- Status Dropdown -->
        <select v-model="editingJob.decision_status" class="w-full p-2 border rounded-md mt-2">
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interview Scheduled</option>
          <option value="Offer">Offer Received</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Withdrawn">Withdrawn</option>
        </select>

        <!-- Status Date Input -->
        <input v-if="editingJob.decision_status === 'Interviewing'" 
               type="date" v-model="editingJob.interview_date" 
               class="w-full p-2 border rounded-md mt-2" />
        
        <input v-if="editingJob.decision_status === 'Offer'" 
               type="date" v-model="editingJob.offer_date" 
               class="w-full p-2 border rounded-md mt-2" />

        <input v-if="['Accepted', 'Rejected', 'Withdrawn'].includes(editingJob.decision_status)" 
               type="date" v-model="editingJob.decision_date" 
               class="w-full p-2 border rounded-md mt-2" />

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
import { ref, onMounted } from 'vue';
import { getJobs, updateJob, deleteJob } from '@/api.js';

export default {
  setup() {
    const jobs = ref([]);
    const editingJob = ref(null);

    const fetchJobs = async () => {
      try {
        jobs.value = await getJobs();
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    onMounted(fetchJobs);

    // Format status to capitalize first letter
    const formatStatus = (status) => {
      if (!status) return "N/A";
      return status.charAt(0).toUpperCase() + status.slice(1);
    };

    // Get the corresponding date field for the status
    const formatStatusDate = (job) => {
      if (!job.decision_status) return "";
      const statusDates = {
        "Applied": job.applied_date ? `- ${job.applied_date}` : "",
        "Interviewing": job.interview_date ? `- Scheduled for ${job.interview_date}` : "",
        "Offer": job.offer_date ? `- ${job.offer_date}` : "",
        "Accepted": job.decision_date ? `- ${job.decision_date}` : "",
        "Rejected": job.decision_date ? `- ${job.decision_date}` : "",
        "Withdrawn": job.decision_date ? `- ${job.decision_date}` : "",
      };
      return statusDates[job.decision_status] || "";
    };

    // Status class for styling
    const statusClass = (status) => {
      const statusColors = {
        "Applied": "bg-blue-100 text-blue-700",
        "Interviewing": "bg-yellow-100 text-yellow-700",
        "Offer": "bg-green-100 text-green-700",
        "Accepted": "bg-green-500 text-white",
        "Rejected": "bg-red-100 text-red-700",
        "Withdrawn": "bg-gray-300 text-gray-700",
      };
      return statusColors[status] || "bg-gray-100 text-gray-700";
    };

    const deleteJobEntry = async (jobId) => {
      if (confirm('Are you sure you want to delete this job?')) {
        try {
          await deleteJob(jobId);
          jobs.value = jobs.value.filter(job => job.id !== jobId);
        } catch (error) {
          console.error("Error deleting job:", error);
        }
      }
    };

    const editJob = (job) => {
      editingJob.value = { ...job };
    };

    const saveJob = async () => {
      try {
        if (!editingJob.value.decision_status) {
          editingJob.value.decision_status = "Applied";
        }

        console.log("Sending updated job data:", JSON.stringify(editingJob.value, null, 2));

        await updateJob(editingJob.value.id, {
          ...editingJob.value,
        });

        jobs.value = jobs.value.map(job => 
          job.id === editingJob.value.id ? { ...editingJob.value } : job
        );
        editingJob.value = null;
      } catch (error) {
        console.error("Error updating job:", error);
      }
    };

    const cancelEdit = () => {
      editingJob.value = null;
    };

    return {
      jobs,
      editingJob,
      formatStatus,
      formatStatusDate,
      statusClass,
      deleteJob: deleteJobEntry,
      editJob,
      saveJob,
      cancelEdit,
    };
  }
};
</script>