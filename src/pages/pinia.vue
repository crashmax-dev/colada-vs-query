<template>
  <button @click="store.prevPage">
    Prev
  </button>
  <span>{{ store.userId }}</span>
  <button @click="store.nextPage">
    Next
  </button>
  <button @click="store.invalidate">
    Invalidate
  </button>
  <pre>{{ store }}</pre>
</template>

<script setup lang="ts">
import { useUsersStore } from '../pinia/use-users'

const store = useUsersStore()
</script>
