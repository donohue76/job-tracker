// src/stores/jobStore.js

import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useJobStore = defineStore("jobStore", () => {
  const jobs = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchJobs() {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get("/api/jobs/");
      jobs.value = response.data;
    } catch (err) {
      error.value = "Error fetching jobs";
      console.error("Error fetching jobs:", err);
    } finally {
      loading.value = false;
    }
  }

  async function addJob(newJob) {
    try {
      const response = await axios.post("/api/jobs/", newJob);
      jobs.value.push(response.data);
      return response.data;
    } catch (err) {
      console.error("Error adding job:", err);
      error.value = "Error adding job";
      throw err;
    }
  }

  async function updateJob(updatedJob) {
    try {
      const response = await axios.put(`/api/jobs/${updatedJob.id}/`, updatedJob);
      const index = jobs.value.findIndex((job) => job.id === updatedJob.id);
      if (index !== -1) {
        jobs.value[index] = response.data;
      }
    } catch (err) {
      console.error("Error updating job:", err);
      error.value = "Error updating job";
    }
  }

  async function deleteJob(jobId) {
    try {
      await axios.delete(`/api/jobs/${jobId}`);
      jobs.value = jobs.value.filter((job) => job.id !== jobId);
    } catch (err) {
      console.error("Error deleting job:", err);
      error.value = "Error deleting job";
    }
  }

  return { jobs, loading, error, fetchJobs, addJob, updateJob, deleteJob };
});