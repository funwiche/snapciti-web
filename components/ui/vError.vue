<template>
  <section
    v-if="message"
    class="text-error py-2 px-3 border-l-8 border-error bg-error/20 mb-3"
  >
    <i class="fa-solid fa-warning mr-2"></i> {{ message }}
  </section>
</template>

<script setup lang="ts">
defineProps<{ message: string | null }>();
</script>

<style scoped></style>
