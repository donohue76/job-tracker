<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="p-6 bg-white shadow-md rounded-md w-80">
      <h2 class="text-xl font-bold mb-4">{{ isLogin ? "Login" : "Register" }}</h2>

      <form @submit.prevent="submitForm" class="space-y-4">
        <input v-model="username" placeholder="Username" class="w-full p-2 border rounded-md" required />
        <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded-md" required />

        <button class="w-full bg-blue-600 text-white py-2 rounded-md">
          {{ isLogin ? "Login" : "Register" }}
        </button>
      </form>

      <p class="mt-4 text-center">
        <a @click="isLogin = !isLogin" class="text-blue-500 cursor-pointer">
          {{ isLogin ? "Need an account? Register" : "Already have an account? Login" }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { isLogin: true, username: "", password: "" };
  },
  methods: {
    async submitForm() {
      console.log(this.isLogin ? "Logging in..." : "Registering...");
    }
  }
};
</script>