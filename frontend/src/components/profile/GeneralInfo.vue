<!-- src/components/profile/GeneralInfo.vue -->
<!-- This component handles the general information form including profile picture upload -->

<template>
  <v-card class="mb-6">
    <v-card-title class="text-h6 font-weight-bold">General Information</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-container>
          <v-row>
            <!-- Profile Picture Upload -->
            <v-col cols="12" md="6">
              <v-label class="text-subtitle-2">Profile Picture</v-label>
              <v-file-input 
                accept="image/*" 
                label="Upload Image" 
                prepend-icon="mdi-camera"
                @change="handleImageUpload"
                outlined
                dense
              ></v-file-input>
              <v-avatar v-if="imagePreview" size="64">
                <v-img :src="imagePreview" alt="Profile Preview"></v-img>
              </v-avatar>
              <v-avatar v-else size="64" class="bg-grey-lighten-3">
                <v-icon>mdi-account</v-icon>
              </v-avatar>
            </v-col>

            <!-- Full Name Input -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="fullName"
                label="Full Name"
                placeholder="John Doe"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <!-- Date of Birth Input -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="dob"
                label="Date of Birth"
                type="date"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <!-- Address Input -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="address"
                label="Address"
                placeholder="123 Main St, City, Country"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <!-- Save Button -->
        <v-card-actions>
          <v-btn color="primary" type="submit">Save General Info</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

// Reactive form variables
const fullName = ref('');
const dob = ref('');
const address = ref('');
const imagePreview = ref(null);

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Handle form submission
const handleSubmit = () => {
  console.log('General Information saved:', { 
    fullName: fullName.value, 
    dob: dob.value, 
    address: address.value 
  });
  alert('General Information Saved');
};
</script>