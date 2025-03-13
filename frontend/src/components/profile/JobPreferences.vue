<!-- src/components/profile/JobPreferences.vue -->

<template>
  <v-card class="mb-6">
    <v-card-title class="text-h6 font-weight-bold">Job Preferences</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-container>
          <v-row>
            <!-- Desired Role Input -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.desired_role"
                label="Desired Role"
                placeholder="Frontend Developer"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <!-- Preferred Location Input -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.preferred_location"
                label="Preferred Location"
                placeholder="Remote / City Name"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <!-- Salary Range Input -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.salary_range"
                label="Salary Range"
                placeholder="$90k - $120k"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <!-- Industry Input -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="profile.industry"
                label="Industry"
                placeholder="Tech, Finance, etc."
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <!-- Save Button -->
        <v-card-actions>
          <v-btn color="primary" type="submit" :loading="loading">
            Save Job Preferences
          </v-btn>
          <v-alert v-if="error" type="error" dense class="ml-4">
            {{ error }}
          </v-alert>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useProfileStore()
const { profile, loading, error } = storeToRefs(store)

// Fetch profile data when component mounts
onMounted(async () => {
  await store.fetchProfile()
})

// Handle form submission
async function handleSubmit() {
  const success = await store.updateProfile({
    desired_role: profile.value.desired_role,
    preferred_location: profile.value.preferred_location,
    salary_range: profile.value.salary_range,
    industry: profile.value.industry
  })
  
  if (success) {
    alert('Job Preferences Saved Successfully!')
  }
}
</script>