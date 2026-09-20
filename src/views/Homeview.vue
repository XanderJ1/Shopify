<script setup>
import { nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import Hero from '@/components/Hero.vue';
import Products from '@/components/Products.vue';

const route = useRoute();
watch(() => route.fullPath, async () => {
  if (route.hash !== '#featured-products') return;
  await nextTick();
  const collection = document.getElementById('featured-products');
  collection?.focus({ preventScroll: true });
  collection?.scrollIntoView({ block: 'start' });
}, { immediate: true });
</script>

<template>
  <Hero />
  <Products />
</template>
