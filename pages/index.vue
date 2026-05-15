<template>
  <section class="xs py-6">
    <h1>Login or Register</h1>
    <v-error :message="errorCode" />

    <div v-if="user" class="mb-4">
      <div class="text-xs">
        <pre>{{ user }}</pre>
      </div>
      <button @click="SIGN_OUT" class="btn-primary bg-error">Sign Out</button>
    </div>
    <div v-else class="grid gap-4">
      <PhoneLogin v-model:error="errorCode" />
      <div class="d-start gap-2 uppercase text-xs px-4">
        <hr class="w-full" />
        <span>or</span>
        <hr class="w-full" />
      </div>
      <GoogleLogin v-model:error="errorCode" />
      <FacebookLogin v-model:error="errorCode" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { signOut } from "firebase/auth";
const email = "snapdevx@gmail.com";
const password = "A@glDvePrl4opo09a)";
const app = useAppConfig();
const user = useAuthUser();
const errorCode = ref<string | null>(null);

function SIGN_OUT() {
  signOut($auth)
    .then(() => (user.value = null))
    .catch((error) => (errorCode.value = error.code));
}
</script>
