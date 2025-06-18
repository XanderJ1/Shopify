<script setup>
import { RouterView } from 'vue-router';

import Navbar from '@/components/Navbar.vue'
import Foot from '@/views/Foot.vue';
</script>

<template>
    <Navbar />
    <RouterView />    
    <Foot />
</template>

<style scoped>

</style>
