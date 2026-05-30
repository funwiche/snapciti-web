<template>
  <footer class="bg-main border-t text-xs">
    <div class="py-4 xl d-start d-between">
      &copy {{ new Date().getFullYear() }} {{ app.name }}. All Right Reserved
      <div class="d-start">
        <NuxtLink :to="$path({ name: 'about' })" class="p-2 uppercase">
          {{ $t("about") }}
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const app = useAppConfig();
</script>

<style scoped></style>
