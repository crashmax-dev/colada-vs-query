<template>
  <pre>{{ users.data }}</pre>
</template>

<script setup lang="ts">
import { useUsersQuery2 } from '../pinia/use-users-2'

const users = useUsersQuery2()
</script>
