<script setup>
import Navbar from '@/components/Navbar.vue'
import { RouterView } from 'vue-router';  
</script>

<template>
  <header>
    <Navbar />
    <RouterView />
  </header>
</template>

<style scoped>
</style>
