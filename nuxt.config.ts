// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@nuxtjs/device"],
  components: [{ path: "~/components", pathPrefix: false, global: true }],
  runtimeConfig: {
    mailer: {
      port: 465,
      secure: true,
      host: "smtp.hostinger.com",
      auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_SECRET },
    },
    public: {
      firebaseConfig: {
        apiKey: "AIzaSyD7ULmCQo_usWWaJrnMETFDs347VvjV0C4",
        authDomain: "snapciti-com.firebaseapp.com",
        projectId: "snapciti-com",
        storageBucket: "snapciti-com.firebasestorage.app",
        messagingSenderId: "951918540433",
        appId: "1:951918540433:web:2dbb4e29b173ec6a89b130",
        measurementId: "G-ZSY7JMPPH8",
      },
    },
  },
  i18n: {
    baseUrl: process.env.BASE_URL,
    locales: [
      { code: "en", language: "en-GB", name: "English", dir: "ltr" },
      { code: "fr", language: "fr-FR", name: "Français", dir: "ltr" },
      { code: "es", language: "es-ES", name: "Espanõl", dir: "ltr" },
      { code: "pt", language: "pt-PT", name: "Português", dir: "ltr" },
    ],
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    customRoutes: "meta",
    defaultLocale: "en",
  },
});
