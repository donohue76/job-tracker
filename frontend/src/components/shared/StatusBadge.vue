<!-- src/components/StatusBadge.vue -->

<template>
  <v-chip 
    class="text-white font-weight-medium" 
    :color="statusColors[status]" 
    size="small" 
    label
  >
    {{ status }}
  </v-chip>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'].includes(value)
  }
});

// Vuetify color system ensures UI consistency & accessibility
const statusColors = {
  'Applied': 'blue-darken-2',
  'Interview': 'yellow-darken-2',
  'Offer': 'green-darken-2',
  'Rejected': 'red-darken-2',
  'Accepted': 'purple-darken-2'
};
</script>