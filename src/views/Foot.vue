<script setup>
import { RouterLink } from 'vue-router';
const role = localStorage.getItem('role');
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-stone-200 bg-stone-100 text-stone-600">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-2">
          <RouterLink to="/" class="inline-flex min-h-12 items-center font-serif text-4xl tracking-tight text-emerald-950">ShopEase<span class="text-orange-700">.</span></RouterLink>
          <p class="mt-4 max-w-sm font-serif text-2xl text-emerald-950">Good finds. Great days.</p>
          <p class="mt-3 max-w-sm text-sm leading-relaxed">For your space, your style, and everything in between. Discover the things that make everyday living your own.</p>
          <RouterLink v-if="!role" to="/signup" class="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-emerald-950 underline underline-offset-4">Make yourself at home <i class="pi pi-arrow-up-right" aria-hidden="true"></i></RouterLink>
        </div>
        <nav aria-label="Footer collections">
          <h2 class="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-950">Discover</h2>
          <ul>
            <li v-for="category in ['All', 'Tech', 'Style', 'Home', 'Beauty', 'Accessories']" :key="category">
              <RouterLink :to="{ path: '/', query: { category }, hash: '#featured-products' }" class="inline-flex min-h-11 items-center text-sm hover:text-emerald-950 hover:underline">{{ category === 'All' ? 'All finds' : category === 'Home' ? 'Home & living' : category }}</RouterLink>
            </li>
          </ul>
        </nav>
        <nav aria-label="Footer account">
          <h2 class="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-950">Your ShopEase</h2>
          <ul>
            <template v-if="role === 'BUYER' || role === 'SELLER'">
              <li><RouterLink to="/orders" class="inline-flex min-h-11 items-center text-sm hover:underline">My orders</RouterLink></li>
              <li><RouterLink :to="role === 'SELLER' ? '/myProducts' : '/cart'" class="inline-flex min-h-11 items-center text-sm hover:underline">{{ role === 'SELLER' ? 'My products' : 'Shopping bag' }}</RouterLink></li>
            </template>
            <template v-else>
              <li><RouterLink to="/login" class="inline-flex min-h-11 items-center text-sm hover:underline">Sign in</RouterLink></li>
              <li><RouterLink to="/signup" class="inline-flex min-h-11 items-center text-sm hover:underline">Create an account</RouterLink></li>
            </template>
            <li><a href="tel:0610353967" class="inline-flex min-h-11 items-center text-sm hover:underline">Contact: 0610353967</a></li>
          </ul>
        </nav>
      </div>
      <div class="mt-10 flex flex-col justify-between gap-4 border-t border-stone-300 pt-6 text-xs sm:flex-row">
        <p>&copy; {{ year }} ShopEase. All rights reserved.</p>
        <p class="flex items-center gap-2"><i class="pi pi-globe" aria-hidden="true"></i>English <span class="mx-2 text-stone-300">/</span> USD $</p>
      </div>
    </div>
  </footer>
</template>
