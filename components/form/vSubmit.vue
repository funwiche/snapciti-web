<template>
  <button
    type="submit"
    :disabled="disabled"
    class="d-center rounded-xl h-14 text-white font-bold w-full text-sm bg-info/95"
    :class="{
      'hover:bg-info': !disabled,
      'pointer-events-none': loading,
      'opacity-65 cursor-not-allowed': disabled,
    }"
  >
    <v-spinner v-if="loading" />
    <span v-else>{{ value || "Submit" }}</span>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ value?: string; loading?: boolean; disabled?: boolean }>(),
  { loading: false, disabled: false },
);
</script>

<style scoped></style>
