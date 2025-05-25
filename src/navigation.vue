<template>
  <nav>
    <ul>
      <li>
        <router-link to="/">
          Home
        </router-link>
      </li>
      <li>
        <router-link to="/pinia">
          Pinia
        </router-link>
      </li>
      <li>
        <router-link to="/query">
          Query
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}

.router-link-active {
  background-color: rebeccapurple;
  color: white;
}
</style>
