<template>
  <div class="p-6">
    <div class="xs">
      <div class="d-center p-4">
        <img
          src="https://s3-media0.fl.yelpcdn.com/assets/public/avatar_48x48_v2.yji-7f28a79d5bee28de.svg"
        />
      </div>
      <Register v-if="email && stage == 'register'" :email="email" />
      <EmailLogin v-else-if="email && stage == 'login'" :email="email" />
      <form v-else @submit.prevent="submit">
        <h3 class="text-center font-black">Login or register</h3>
        <div class="text-center pb-6">Connect with great local businesses</div>
        <v-error :message="errorCode" />
        <v-input
          required
          type="email"
          v-model="email"
          placeholder="Email address"
          hide-details
        />

        <v-submit :loading="loading" :disabled="!$f.validate.email(email)" />

        <div class="d-start gap-2 uppercase text-xs p-4">
          <hr class="w-full" />
          <span>or</span>
          <hr class="w-full" />
        </div>
        <GoogleLogin v-model:error="errorCode" />
        <FacebookLogin v-model:error="errorCode" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const stage = ref("");
const errorCode = ref<string | null>(null);
const loading = ref(false);
const email = ref("funwiche.dev@gmail.com");
// const data = {
//   email: "funwiche.dev@gmail.com",
//   displayName: "Funwi Che",
//   password: "A@glDvePrl4opo09a)",
// };
const { auth_modal } = useAppState();

async function submit() {
  try {
    errorCode.value = null;
    loading.value = true;
    const res = await $fetch(`/api/auth?email=${email.value}`);
    if (res) stage.value = "login";
    else stage.value = "register";
  } catch (error: any) {
    errorCode.value = handleError(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
