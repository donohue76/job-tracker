<!-- src/components/shared/SearchFilter.vue -->
<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
    
    <!-- Search Input -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Search</label>
      <input
        type="text"
        v-model="filters.search"
        @input="updateFilters"
        placeholder="Search jobs..."
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
    </div>

    <!-- Status Filter -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Status</label>
      <select
        v-model="filters.status"
        @change="updateFilters"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        <option v-for="status in statuses" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>

    <!-- Date Range -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Date Range</label>
      <div class="grid grid-cols-2 gap-4 mt-1">
        <input
          type="date"
          v-model="filters.startDate"
          @change="updateFilters"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
        <input
          type="date"
          v-model="filters.endDate"
          @change="updateFilters"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
      </div>
    </div>

    <!-- Clear Filters -->
    <button
      @click="clearFilters"
      class="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Clear Filters
    </button>
  </div>
</template>

<script setup>
defineProps({
  filters: Object, //Ensure filters is defined as a prop
});

import { ref, watch } from 'vue'

const statuses = ['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted']

const filters = ref({
  search: '',
  status: '',
  startDate: '',
  endDate: ''
})

const emit = defineEmits(['update:filters'])

const updateFilters = () => {
  emit('update:filters', filters.value)
}

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    startDate: '',
    endDate: ''
  }
  updateFilters()
}

// Watch for prop changes
watch(() => props.initialFilters, (newFilters) => {
  if (newFilters) {
    filters.value = { ...newFilters }
  }
}, { deep: true })
</script>