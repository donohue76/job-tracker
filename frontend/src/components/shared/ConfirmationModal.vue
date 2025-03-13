<!-- src/components/shared/ConfirmationModal.vue -->

<template>
  <v-dialog v-model="show" max-width="400px" persistent>
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-body-2 text-gray-600">
        {{ message }}
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="$emit('cancel')">
          {{ cancelText }}
        </v-btn>
        <v-btn :color="dangerous ? 'error' : 'primary'" @click="$emit('confirm')">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: "Confirm"
  },
  cancelText: {
    type: String,
    default: "Cancel"
  },
  dangerous: {
    type: Boolean,
    default: false
  }
});

// Define all emitted events explicitly
defineEmits(["confirm", "cancel", "close"]);
</script>