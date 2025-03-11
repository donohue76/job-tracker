<!-- src/components/shared/ConfirmationModal.vue -->
<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      <!-- Modal -->
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="relative bg-white rounded-lg max-w-md w-full p-6">
          <div class="mb-4">
            <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
            <p class="mt-2 text-sm text-gray-500">{{ message }}</p>
          </div>
          
          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="$emit('cancel')"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              {{ cancelText }}
            </button>
            <button
              @click="$emit('confirm')"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-md',
                dangerous 
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              ]"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
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
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  dangerous: {
    type: Boolean,
    default: false
  }
})

defineEmits(['confirm', 'cancel'])
</script>