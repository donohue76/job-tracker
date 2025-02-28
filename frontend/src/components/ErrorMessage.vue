<template>
  <div v-if="authStore.errorMessage" class="error-box">
    <p>{{ authStore.errorMessage }}</p>
    <button @click="authStore.clearError" class="close-btn">✖</button>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  }
};
</script>

<style scoped>
.error-box {
  background-color: #ffe0e0;
  color: #d8000c;
  border: 1px solid #d8000c;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
}
.close-btn {
  background: none;
  border: none;
  color: #d8000c;
  font-size: 16px;
  cursor: pointer;
}
</style>