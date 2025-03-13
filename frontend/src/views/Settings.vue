<!--src/views/Settings.vue -->

<template>
  <v-container>
    <h2 class="text-h4 font-weight-bold mb-6">Settings</h2>

    <v-card class="pa-6">
      <h3 class="text-h5 font-weight-bold mb-4">Notification Preferences</h3>
      <v-switch v-model="settings.emailNotifications" label="Email Notifications"></v-switch>
      <v-switch v-model="settings.jobAlerts" label="Job Alert Notifications"></v-switch>
    </v-card>

    <v-card class="pa-6 mt-4">
      <h3 class="text-h5 font-weight-bold mb-4">Display Settings</h3>
      <v-switch v-model="settings.darkMode" label="Dark Mode"></v-switch>
    </v-card>

    <v-btn color="primary" class="mt-4" @click="saveSettings">
      {{ isSaving ? "Saving..." : "Save Settings" }}
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();
const isSaving = ref(false);

const settings = ref({
  emailNotifications: true,
  jobAlerts: true,
  darkMode: false,
});

const saveSettings = async () => {
  isSaving.value = true;
  await settingsStore.updateSettings(settings.value);
  isSaving.value = false;
};
</script>