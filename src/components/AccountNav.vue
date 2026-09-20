<script setup>
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute();
const seller = localStorage.getItem('role') === 'SELLER';
const links = seller
  ? [{ to: '/myProducts', label: 'My products', icon: 'pi pi-th-large' }, { to: '/orders', label: 'Orders', icon: 'pi pi-box' }, { to: '/addProduct', label: 'Add product', icon: 'pi pi-plus' }]
  : [{ to: '/orders', label: 'My orders', icon: 'pi pi-box' }, { to: '/cart', label: 'Shopping bag', icon: 'pi pi-shopping-bag' }];
</script>

<template>
  <nav aria-label="Account navigation" class="mb-8 flex gap-6 overflow-x-auto border-b border-stone-200 sm:mb-10 sm:gap-8">
    <RouterLink v-for="link in links" :key="link.to" :to="link.to" :aria-current="route.path === link.to ? 'page' : undefined" class="inline-flex min-h-14 shrink-0 items-center gap-2 border-b-2 px-1 text-sm transition-colors" :class="route.path === link.to ? 'border-emerald-950 font-medium text-emerald-950' : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-900'">
      <i :class="link.icon" aria-hidden="true"></i>{{ link.label }}
    </RouterLink>
  </nav>
</template>
