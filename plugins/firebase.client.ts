import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const { firebaseConfig } = useRuntimeConfig().public;

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize services you need
  const auth = getAuth(app);
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) return;
    await $f.delay(4000);
    await auth.signOut();
  });
  return { provide: { auth } };
});
