<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20">
    <div class="rounded-2xl bg-orange-50 p-8 text-center sm:p-12">
      <span class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-emerald-950"><i class="pi pi-shopping-bag" aria-hidden="true"></i></span>
      <p class="mt-6 text-xs font-medium uppercase tracking-widest text-orange-800">One step closer</p>
      <h1 class="mt-4 font-serif text-4xl tracking-tight text-emerald-950">Your favourites await.</h1>
      <p class="mt-5 leading-relaxed text-stone-600">Review your items in your shopping bag, then continue to checkout to complete your purchase.</p>
      <RouterLink to="/cart" class="mt-8 inline-flex min-h-12 items-center gap-4 rounded-full bg-emerald-950 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-800">Go to my bag <i class="pi pi-arrow-right" aria-hidden="true"></i></RouterLink>
    </div>
  </section>
</template>
