<template>
  <div>
    <h2>Add Job</h2>
    <form @submit.prevent="submitJob">
      <input v-model="job.title" placeholder="Job Title" required />
      <input v-model="job.company" placeholder="Company" required />
      <input type="date" v-model="job.date_applied" required />
      <select v-model="job.status">
        <option value="applied">Applied</option>
        <option value="interview">Interview Scheduled</option>
        <option value="offer">Offer Received</option>
        <option value="rejected">Rejected</option>
        <option value="withdrawn">Withdrawn</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  </div>
</template>

<script>
import { addJob } from '@/api';

export default {
  data() {
    return {
      job: {
        title: '',
        company: '',
        date_applied: '',
        status: 'applied',
      },
    };
  },
  methods: {
    async submitJob() {
      await addJob(this.job);
      alert('Job added!');
      this.job = { title: '', company: '', date_applied: '', status: 'applied' };
    },
  },
};
</script>