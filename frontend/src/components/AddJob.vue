<template>
  <form @submit.prevent="submitJob" class="space-y-4 bg-white p-6 shadow-md rounded-md">
    <input v-model="job.company" placeholder="Company Name" required class="w-full border p-2 rounded" />
    <input v-model="job.position" placeholder="Job Title" required class="w-full border p-2 rounded" />
    <input v-model="job.applied_date" type="date" required class="w-full border p-2 rounded" />

    <!-- Status Dropdown -->
    <select v-model="job.decision_status" class="w-full p-2 border rounded-md mt-2">
      <option value="">Select Status</option>
      <option value="applied">Applied</option>
      <option value="interview">Interview Scheduled</option>
      <option value="offer">Offer Received</option>
      <option value="accepted">Accepted</option>
      <option value="rejected">Rejected</option>
      <option value="withdrawn">Withdrawn</option>
    </select>

    <button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Submit
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import { addJob } from "@/api.js";

export default {
  setup(_, { emit }) {
    const job = ref({
      company: "",
      position: "",
      applied_date: "",
      decision_status: "",  // Keep it empty initially
    });

    const capitalizeStatus = (status) => {
      if (!status) return "";
      return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const submitJob = async () => {
      try {
        // Ensure status is properly formatted before sending
        job.value.decision_status = capitalizeStatus(job.value.decision_status);

        console.log("📤 Sending job data:", JSON.stringify(job.value, null, 2));

        const response = await addJob(job.value);
        console.log("✅ Job added successfully:", response);

        emit("jobAdded", response);

        // Reset form
        job.value = {
          company: "",
          position: "",
          applied_date: "",
          decision_status: "",
        };
      } catch (error) {
        console.error("🚨 API Error:", error);
        
        if (error.response) {
          console.error("❌ API Response Data:", error.response.data);
          alert(`API Error: ${JSON.stringify(error.response.data, null, 2)}`);
        }
      }
    };

    return { job, submitJob };
  }
};
</script>