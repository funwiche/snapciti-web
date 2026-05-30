<template>
  <div class="input-container">
    <label v-if="label" :for="id" class="input-label text-sm opacity-65">
      {{ label }}
    </label>
    <div class="input-content">
      <select
        :id="id"
        :name="name"
        v-model="model"
        :size="size"
        :disabled="disabled"
        :required="required"
        :multiple="multiple"
        autocomplete="off"
        class="custom-input px-3 py-2 border h-9 text-xs font-bold"
      >
        <option
          v-if="placeholder && !multiple"
          value=""
          disabled
          selected
          hidden
        >
          {{ placeholder }}
        </option>

        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>
    <div class="h-6">
      <span v-if="errorMessage" class="error-text">{{ errorMessage }}</span>
      <span v-else-if="hint" class="hint-text">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}
interface Prop {
  label?: string;
  hint?: string;
  items?: SelectOption[] | any[];
  id?: string;
  name?: string;
  size?: number | string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  multiple?: boolean;
}
const props = withDefaults(defineProps<Prop>(), {
  items: () => [],
  disabled: false,
  required: false,
  multiple: false,
});
const model = defineModel<string | number>({ default: "" });
const errorMessage = ref("");
const options = computed(() => props.items);
</script>

<style scoped></style>
