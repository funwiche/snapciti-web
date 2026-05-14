<template>
  <section class="xl py-6">
    <h1>{{ app.name }}</h1>
    <div class="mb-4">
      <section class="mb-6">
        <div v-if="success">
          <input type="text" v-model="code" class="border p-2" />
          <button @click="ConfirmationResult" class="btn-primary mr-4">
            Confirm Verification Code
          </button>
        </div>
        <div v-else>
          <button
            @click="SignInWithPhoneNumber"
            class="btn-primary mr-4"
            id="sign-in-button"
          >
            Sign In With Phone Number
          </button>
        </div>
      </section>

      <button @click="SIGN_IN" class="btn-primary mr-4">Sign In</button>
      <button @click="SIGN_OUT" class="btn-primary bg-error">Sign Out</button>
    </div>
    <div v-if="errorMessage" class="text-error p-4 border border-error">
      <b>{{ errorCode }}</b> - {{ errorMessage }}
    </div>
    <div class="text-xs">
      <pre>{{ user }}</pre>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
const code = ref("121212");
const email = "snapdevx@gmail.com";
const password = "A@glDvePrl4opo09a)";
const phoneNumber = "+447346143312";
const app = useAppConfig();
const user = useAuthUser();
const success = ref(false);
const errorCode = ref(null);
const errorMessage = ref(null);
onMounted(() => {
  window.recaptchaVerifier = new RecaptchaVerifier($auth, "sign-in-button", {
    size: "invisible",
  });
});

function SignInWithPhoneNumber() {
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber($auth, phoneNumber, appVerifier)
    .then((result) => {
      window.confirmationResult = result;
      success.value == true;
    })
    .catch((error) => {
      errorCode.value = error.code;
      errorMessage.value = error.message;
      console.error(error);
    });
}
function ConfirmationResult() {
  window.confirmationResult
    .confirm(code.value)
    .then((result: any) => {
      window.confirmationResult = result;
    })
    .catch((error: any) => {
      errorCode.value = error.code;
      errorMessage.value = error.message;
      console.error(error);
    })
    .finally(() => {
      success.value == false;
    });
}
function SIGN_IN() {
  const provider = new GoogleAuthProvider();
  signInWithPopup($auth, provider)
    .then((result) => {
      user.value = result.user;
    })
    .catch((error) => {
      errorCode.value = error.code;
      errorMessage.value = error.message;
      console.error(error);
    });
}
function SIGN_OUT() {
  signOut($auth)
    .then(() => {
      user.value = null;
    })
    .catch((error) => {
      errorCode.value = error.code;
      errorMessage.value = error.message;
    });
}
</script>
