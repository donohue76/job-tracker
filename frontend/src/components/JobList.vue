<template>
  <div>
    <h2>Job Applications</h2>
    <ul>
      <li v-for="job in jobs" :key="job.id">
        {{ job.title }} at {{ job.company }} - {{ job.status }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getJobs } from '@/api';

export default {
  data() {
    return {
      jobs: [],
    };
  },
  async created() {
    this.jobs = await getJobs();
  },
};
</script>