<template>
  <div class="input-container">
    <label v-if="label" class="input-label text-sm p-2 font-bold">
      {{ label }}
    </label>
    <div class="relative d-start">
      <input
        ref="input"
        :max="max"
        :min="min"
        :type="type"
        :value="model"
        :required="required"
        :maxlength="maxlength"
        :minlength="minlength"
        :pattern="pattern"
        @invalid="checkValidity"
        style="display: none"
      />
      <input
        :min="min"
        :max="max"
        :type="type == 'password' && secure ? 'password' : 'text'"
        v-model="model"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :maxlength="maxlength"
        :minlength="minlength"
        :placeholder="placeholder"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="none"
        class="v-input"
        @blur="focus = false"
        @focus="focus = true"
        @keypress.enter.prevent
        @input="checkValidity"
        :class="{ error, focus }"
      />
    </div>
    <div v-if="!hideDetails" class="h-6 text-[10px] px-2 pt-0.5 font-medium">
      <span v-if="error" class="text-error">{{ error }}</span>
      <span v-else-if="hint" class="opacity-65">{{ hint }}</span>
    </div>
    <div v-else class="h-2" />
  </div>
</template>

<script setup lang="ts">
interface Prop {
  label?: string;
  hint?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  maxlength?: number | string;
  minlength?: number | string;
  pattern?: string;
  min?: number | string;
  max?: number | string;
  hideDetails?: boolean;
}
const props = withDefaults(defineProps<Prop>(), {
  type: "text",
  disabled: false,
  required: false,
  readonly: false,
  autofocus: false,
  hideDetails: false,
});
const secure = ref(true);
const focus = ref<boolean>(false);
const error = ref<string | undefined>("");
const model = defineModel<string | number>({ default: "" });
const input = ref<HTMLInputElement | null>(null);
async function checkValidity() {
  await $f.delay(20);
  if (!input.value) return;
  if (input.value.validity.valid) error.value = "";
  else error.value = $f.getValidity(input.value.validity, props.type);
}
</script>

<style scoped></style>
