<!-- src/components/AddJob.vue -->

<template>
  <v-container class="pa-6">
    <v-card class="pa-6 mx-auto" max-width="500">
      <v-card-title class="text-h5 font-weight-bold">Add Job</v-card-title>
      <v-card-subtitle>Enter details for your job application</v-card-subtitle>

      <v-form @submit.prevent="submitJob" ref="form">
        <!-- Job Title -->
        <v-text-field 
          v-model="job.title"
          label="Job Title"
          variant="outlined"
          required
        ></v-text-field>

        <!-- Company -->
        <v-text-field 
          v-model="job.company"
          label="Company"
          variant="outlined"
          required
        ></v-text-field>

        <!-- Date Applied -->
        <v-text-field
          v-model="job.date_applied"
          label="Date Applied"
          variant="outlined"
          type="date"
          required
        ></v-text-field>

        <!-- Job Status Dropdown -->
        <v-select
          v-model="job.status"
          :items="statusOptions"
          label="Application Status"
          variant="outlined"
        ></v-select>

        <!-- Submit Button -->
        <v-btn 
          color="primary" 
          block 
          class="mt-4" 
          type="submit"
          :loading="loading"
        >
          Add Job
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useJobStore } from "@/stores/jobStore";

const jobStore = useJobStore();
const job = ref({
  title: "",
  company: "",
  date_applied: "",
  status: "Applied",
});

const submitJob = async () => {
  try {
    await jobStore.addJob(job.value);
    job.value = { title: "", company: "", date_applied: "", status: "Applied" };
  } catch (err) {
    console.error("Failed to add job:", err);
  }
};
</script>