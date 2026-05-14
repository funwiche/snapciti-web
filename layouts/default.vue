<template>
  <div class="flex flex-col min-h-screen">
    <v-header />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
    <v-footer />
  </div>
</template>

<script setup lang="ts">
import { onAuthStateChanged } from "firebase/auth";
useSeoData({});
const user = useAuthUser();
onMounted(() => {
  if ($auth.currentUser) user.value = $auth.currentUser;
  onAuthStateChanged($auth, (currentUser) => {
    if (user) user.value = currentUser;
  });
});
</script>

<style scoped></style>
