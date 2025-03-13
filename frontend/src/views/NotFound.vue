<!-- src/views/NotFound.vue -->

<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
    <v-icon size="128" color="grey-darken-2">mdi-alert-circle-outline</v-icon>
    <h1 class="text-h1 font-weight-bold text-grey-darken-2">404</h1>
    <p class="text-h5 text-grey-darken-1">Oops! The page you are looking for does not exist.</p>
    
    <v-btn color="primary" class="mt-4" to="/dashboard" variant="elevated">
      <v-icon left>mdi-arrow-left</v-icon> Return to Dashboard
    </v-btn>
  </v-container>
</template>