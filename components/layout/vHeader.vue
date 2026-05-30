<template>
  <header class="bg-main border-b">
    <div class="xl h-16 d-between">
      <nuxt-link
        :to="$path({ name: 'index' })"
        class="text-2xl font-black uppercase"
      >
        snapciti
      </nuxt-link>
      <nav class="d-start gap-2">
        <button
          v-for="{ code } in locales"
          :key="code"
          @click="setLocale(code)"
          :class="[
            ' d-center size-9 text-[10px] uppercase font-bold rounded-full',
            locale === code ? 'bg-info text-white' : 'hover',
          ]"
        >
          {{ code }}
        </button>
        <nuxt-link
          :to="$path({ name: 'account' })"
          class="d-center p-1 size-10 rounded-full hover:bg-secondary -mr-1"
        >
          <img
            v-if="user && user.avatar"
            :src="$asset(user.avatar)"
            class="size-full rounded-full"
          />
          <span
            v-else-if="user?.name"
            class="text-sm uppercase rounded-full size-full d-center bg-error text-white"
          >
            {{ user.name.trim()[0] }}
          </span>
          <i v-else class="fa-solid fa-circle-user text-2xl" />
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const app = useAppConfig();
const { auth_modal, user } = useAppState();
const { locale, locales, setLocale } = useI18n();
</script>

<style scoped></style>
