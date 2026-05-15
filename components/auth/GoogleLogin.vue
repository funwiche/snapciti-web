<template>
  <section>
    <button @click="SIGN_IN" class="btn-primary w-full" id="sign-in-button">
      {{ loading ? "Sending..." : "Sign in with Google" }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const user = useAuthUser();
const errorCode = defineModel("error");
const loading = ref(false);

async function SIGN_IN() {
  errorCode.value = null;
  loading.value = true;
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup($auth, provider);
    user.value = result.user;
  } catch (error: any) {
    errorCode.value = error.code;
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
