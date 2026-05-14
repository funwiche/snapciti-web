<template>
  <footer class="bg-white p-4 border-t text-center text-xs">
    &copy {{ new Date().getFullYear() }} {{ app.name }}. All Right Reserved
  </footer>
</template>

<script setup lang="ts">
const app = useAppConfig();
</script>

<style scoped></style>
