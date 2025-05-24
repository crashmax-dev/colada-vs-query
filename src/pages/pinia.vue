<template>
  <button @click="users.prevPage">
    Prev
  </button>
  <span>{{ users.userId }}</span>
  <button @click="users.nextPage">
    Next
  </button>
  <button @click="users.invalidate">
    Invalidate
  </button>
  <pre>{{ users.data }}</pre>
</template>

<script setup lang="ts">
import { useUsersQuery } from '../pinia/use-users'

const users = useUsersQuery()
</script>
