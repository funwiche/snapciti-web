<template>
  <section>
    <div v-if="success" class="spacer-y-4">
      <input
        type="text"
        v-model="code"
        placeholder="123456"
        class="border p-2 mb-4"
      />
      <button @click="VerifyCode" class="btn-primary">Verify Code</button>
    </div>
    <div v-else class="spacer-y-4">
      <input
        v-model="phone"
        type="tel"
        placeholder="+447700900123"
        class="border p-2 mb-4"
      />
      <button @click="SendCode" class="btn-primary w-full" id="sign-in-button">
        {{ loading ? "Sending..." : "Send Code" }}
      </button>
      <div id="recaptcha-container"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const phone = ref("+447346143312");
const code = ref("121212");
const loading = ref(false);
const user = useAuthUser();
const success = ref(false);
const errorCode = defineModel("error");
const confirmationResult = ref<any>(null);
let recaptchaVerifier: RecaptchaVerifier;
onMounted(() => {
  recaptchaVerifier = new RecaptchaVerifier($auth, "sign-in-button", {
    size: "invisible",
  });
});
async function SendCode() {
  errorCode.value = null;
  loading.value = true;
  try {
    if (!recaptchaVerifier)
      throw new Error("reCAPTCHA Verifier not initialized.");
    confirmationResult.value = await signInWithPhoneNumber(
      $auth,
      phone.value,
      recaptchaVerifier,
    );
    success.value = true;
    console.log("SMS code sent.");
  } catch (error: any) {
    errorCode.value = error.code;
    console.error("Error sending code:", error);
  } finally {
    loading.value = false;
  }
}
async function VerifyCode() {
  try {
    loading.value = true;
    const result = await confirmationResult.value.confirm(code.value);
    user.value = result.user;
    success.value = false;
    console.log("Phone authentication successful!", user.value);
  } catch (error: any) {
    errorCode.value = error.code;
    console.error("Error verifying code:", error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
