<template>
  <nav>
    <ul>
      <li>
        <router-link class="link" to="/">
          Home
        </router-link>
      </li>
      <li>
        <router-link class="link" to="/pinia">
          Pinia
        </router-link>
      </li>
      <li>
        <router-link class="link" to="/query">
          Query
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
.link {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.router-link-active {
  background-color: rebeccapurple;
}
</style>
