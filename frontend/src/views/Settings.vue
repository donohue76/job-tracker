<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Settings</h2>
    
    <div class="space-y-8">
      <!-- Notification Settings -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-4">Notification Preferences</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span>Email Notifications</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.emailNotifications" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between">
            <span>Job Alert Notifications</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.jobAlerts" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Display Settings -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-4">Display Settings</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span>Dark Mode</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.darkMode" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Privacy Settings -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-4">Privacy Settings</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span>Profile Visibility</span>
            <select 
              v-model="settings.profileVisibility" 
              class="border rounded-md px-3 py-2"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="connections">Connections Only</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="mt-8">
      <button 
        @click="saveSettings"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        :disabled="isSaving"
      >
        {{ isSaving ? 'Saving...' : 'Save Settings' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const isSaving = ref(false)

const settings = ref({
  emailNotifications: true,
  jobAlerts: true,
  darkMode: false,
  profileVisibility: 'public'
})

const saveSettings = async () => {
  try {
    isSaving.value = true
    await settingsStore.updateSettings(settings.value)
    // Show success message
  } catch (error) {
    // Handle error
    console.error('Failed to save settings:', error)
  } finally {
    isSaving.value = false
  }
}
</script>