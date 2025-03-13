<!-- src/components/shared/SearchFilter.vue -->

<template>
  <v-card class="pa-4 rounded-lg">
    <h3 class="text-h6 font-weight-medium mb-4">Filters</h3>

    <!-- Search Input -->
    <v-text-field
      v-model="filters.search"
      label="Search jobs..."
      variant="outlined"
      density="comfortable"
      clearable
      prepend-inner-icon="mdi-magnify"
      @update:model-value="updateFilters"
    ></v-text-field>

    <!-- Status Filter -->
    <v-select
      v-model="filters.status"
      label="Status"
      variant="outlined"
      density="comfortable"
      :items="statuses"
      clearable
      @update:model-value="updateFilters"
    ></v-select>

    <!-- Date Range -->
    <div class="d-flex align-center gap-4">
      <v-text-field
        v-model="filters.startDate"
        label="Start Date"
        type="date"
        variant="outlined"
        density="comfortable"
        @update:model-value="updateFilters"
      ></v-text-field>

      <v-text-field
        v-model="filters.endDate"
        label="End Date"
        type="date"
        variant="outlined"
        density="comfortable"
        @update:model-value="updateFilters"
      ></v-text-field>
    </div>

    <!-- Clear Filters Button -->
    <v-btn 
      block 
      variant="outlined" 
      color="primary" 
      class="mt-4"
      @click="clearFilters"
    >
      Clear Filters
    </v-btn>
  </v-card>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const statuses = ['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'];

const filters = ref({
  search: '',
  status: '',
  startDate: '',
  endDate: ''
});

defineProps({ filters: Object });

const emit = defineEmits(['update:filters']);

const updateFilters = () => {
  emit('update:filters', filters.value);
};

const clearFilters = () => {
  filters.value = { search: '', status: '', startDate: '', endDate: '' };
  updateFilters();
};
</script>