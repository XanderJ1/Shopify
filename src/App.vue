<script setup>
import { RouterView } from 'vue-router';

import Navbar from '@/components/Navbar.vue'
import Foot from './views/Foot.vue';
</script>

<template>
    <Navbar />
    <div class="maincontent">
      <RouterView />
    </div>
    <Foot />
</template>

<style scoped>
.maincontent{
min-height: 100vh;
}
</style>
