<template>
  <form @submit.prevent="submit">
    <h3 class="text-center font-black">Login or register</h3>
    <v-error :message="errorCode" />
    <v-input
      required
      type="password"
      v-model="body.password"
      placeholder="Password"
      hide-details
    />
    <v-submit
      :loading="loading"
      :disabled="
        !($f.validate.email(body.email) && $f.validate.password(body.password))
      "
    />
  </form>
</template>

<script setup lang="ts">
import { signInWithCustomToken } from "firebase/auth";
const props = defineProps<{ email: string }>();
const emits = defineEmits(["continue"]);
const { $auth } = useNuxtApp();
const loading = ref(false);
const errorCode = ref<string | null>(null);
const body = reactive({
  email: props.email,
  password: "A@glDvePrl4opo09a)",
});

async function submit() {
  try {
    errorCode.value = null;
    loading.value = true;
    const res: any = await $fetch("/api/auth/login", {
      method: "POST",
      body,
    });
    // await createSession(await signInWithCustomToken($auth, res.token));
  } catch (error: any) {
    errorCode.value = handleError(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
