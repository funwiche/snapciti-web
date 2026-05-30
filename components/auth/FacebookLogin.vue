<template>
  <button
    type="button"
    @click="SIGN_IN"
    class="h-14 d-start border rounded-xl w-full mb-2 p-4"
  >
    <v-spinner v-if="loading" />
    <img v-else src="/facebook.png" class="w-6" />
    <div class="flex-1 text-center font-bold text-sm">
      Sign in with Facebook
    </div>
    <div class="size-6" />
  </button>
</template>

<script setup lang="ts">
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
const errorCode = defineModel("error");
const loading = ref(false);
const { $auth } = useNuxtApp();

async function SIGN_IN() {
  errorCode.value = null;
  loading.value = true;
  const provider = new FacebookAuthProvider();
  try {
    const res = await signInWithPopup($auth, provider);
    const body = res.user.providerData.find(
      (el) => el.providerId == "facebook.com",
    );
    const data = await $fetch("/api/auth/facebook", { method: "POST", body });
    if (data) await setCurrentUser(data.user);
  } catch (error: any) {
    errorCode.value = error.code;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
