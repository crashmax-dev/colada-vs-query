<template>
  <pre>{{ users.data }}</pre>
</template>

<script setup lang="ts">
import { useUsersStore2 } from '../pinia/use-users-2';

const users = useUsersStore2()
</script>
