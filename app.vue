<template>
  <div class="flex flex-col min-h-screen">
    <v-header />
    <main class="flex-1 flex flex-col">
      <NuxtPage />
    </main>
    <v-footer />
  </div>
</template>

<script setup lang="ts">
useSeoData({});
const { $auth } = useNuxtApp();
const { auth_modal } = useAppState();
</script>

<style scoped></style>
