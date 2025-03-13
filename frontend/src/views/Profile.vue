<!-- src/views/Profile.vue -->
<!-- This view represents the Profile page. It displays the profile settings,
     which include General Information and Job Preferences sections, along with the navigation layout. -->

<template>
  <v-container fluid>
    <v-container>
      <v-card elevation="4" class="pa-6 mx-auto" max-width="960">
        <v-card-title class="text-h4 font-weight-bold mb-4">Profile Settings</v-card-title>

        <!-- Loading Indicator -->
        <v-container v-if="profileStore.loading" class="d-flex justify-center py-6">
          <v-progress-circular indeterminate color="primary" size="50"></v-progress-circular>
        </v-container>

        <!-- Profile Sections -->
        <v-container v-else>
          <GeneralInfo />
          <JobPreferences />
        </v-container>
      </v-card>
    </v-container>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useProfileStore } from "@/stores/profile";
import GeneralInfo from "@/components/profile/GeneralInfo.vue";
import JobPreferences from "@/components/profile/JobPreferences.vue";

const profileStore = useProfileStore();
onMounted(() => profileStore.fetchProfile());
</script>