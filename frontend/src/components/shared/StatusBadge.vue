<!-- src/components/StatusBadge.vue -->
<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    :class="statusClasses"
  >
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => [
      'Applied',
      'Interview',
      'Offer',
      'Rejected',
      'Accepted'
    ].includes(value)
  }
})

const statusClasses = computed(() => {
  const classes = {
    'Applied': 'bg-blue-100 text-blue-800',
    'Interview': 'bg-yellow-100 text-yellow-800',
    'Offer': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Accepted': 'bg-purple-100 text-purple-800'
  }
  return classes[props.status]
})
</script>