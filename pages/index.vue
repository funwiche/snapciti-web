<template>
  <section class="xl py-6">
    <h1>{{ tn("site_tagline") }}</h1>
    <h4>{{ tn("site_desc") }}</h4>
    <v-body class="xl" />
  </section>
</template>

<script lang="ts" setup>
const app = useAppConfig();
const { auth_modal, user } = useAppState();
</script>
