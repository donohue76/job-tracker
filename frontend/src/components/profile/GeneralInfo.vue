<!-- src/components/profile/GeneralInfo.vue -->
<!-- This component handles the general information form including profile picture upload -->
<template>
  <div class="bg-white rounded-lg shadow mb-6 p-6">
    <h2 class="text-xl font-semibold mb-4">General Information</h2>
    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-2 gap-6">
        <!-- Profile Picture Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
          <div class="flex items-center space-x-4">
            <!-- Display image preview if available -->
            <img 
              v-if="imagePreview" 
              :src="imagePreview" 
              alt="Profile Preview" 
              class="w-16 h-16 rounded-full object-cover"
            />
            <!-- Default placeholder if no image is selected -->
            <div v-else class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <span class="text-sm text-gray-500">No Image</span>
            </div>
            <!-- File input for image upload -->
            <input type="file" @change="handleImageUpload" class="text-sm" />
          </div>
        </div>
        <!-- Full Name Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            v-model="fullName"
            type="text"
            placeholder="John Doe"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <!-- Date of Birth Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            v-model="dob"
            type="date"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <!-- Address Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            v-model="address"
            type="text"
            placeholder="123 Main St, City, Country"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
      <!-- Save Button -->
      <div class="mt-6">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150"
        >
          Save General Info
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive form variables for general information
const fullName = ref('')
const dob = ref('')
const address = ref('')
const imagePreview = ref(null)

// Handle image upload and create a preview using FileReader
function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Handle form submission; here you can perform validation and update the backend.
function handleSubmit() {
  console.log('General Information saved:', { 
    fullName: fullName.value, 
    dob: dob.value, 
    address: address.value 
  })
  alert('General Information Saved')
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>