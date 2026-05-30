<template>
  <div class="input-container">
    <label v-if="label" :for="id" class="input-label text-sm opacity-65">
      {{ label }}
    </label>
    <div class="input-content">
      <textarea
        :id="id"
        :name="name"
        v-model="model"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        :autofocus="autofocus"
        :maxlength="maxlength"
        :minlength="minlength"
        :rows="rows"
        :cols="cols"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="none"
        class="custom-input px-3 py-2 border h-9 text-xs font-bold"
      />
    </div>
    <div class="h-6">
      <span v-if="errorMessage" class="error-text">{{ errorMessage }}</span>
      <span v-else-if="hint" class="hint-text">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Prop {
  label?: string;
  hint?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  rows?: number | string;
  cols?: number | string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  maxlength?: number | string;
  minlength?: number | string;
}
const props = withDefaults(defineProps<Prop>(), {
  rows: 3,
  disabled: false,
  required: false,
  readonly: false,
  autofocus: false,
});
const model = defineModel<string | number>({ default: "" });
const errorMessage = ref("");
</script>

<style scoped></style>
