<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { HOST_URL } from '../config';
import AccountNav from './AccountNav.vue';

const products = ref([]);
const loading = ref(true);
const loadError = ref(false);
const query = ref('');
const sort = ref('default');
const confirmingId = ref(null);
const removingId = ref(null);
const feedback = ref('');
const feedbackError = ref(false);
const listHeading = ref(null);
let removeTrigger;
const formatPrice = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value) || 0);
const visibleProducts = computed(() => {
  const term = query.value.trim().toLowerCase();
  const list = products.value.filter(product => [product.name, product.description].join(' ').toLowerCase().includes(term));
  if (sort.value === 'name') return [...list].sort((a, b) => String(a.name).localeCompare(String(b.name)));
  if (sort.value === 'low') return [...list].sort((a, b) => Number(a.price) - Number(b.price));
  if (sort.value === 'high') return [...list].sort((a, b) => Number(b.price) - Number(a.price));
  return list;
});
function setupAxiosAuth() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
function fetch() {
  loading.value = true;
  loadError.value = false;
  setupAxiosAuth();
  axios.get(`${HOST_URL}api/v1/users/products`)
    .then(response => { products.value = response.data; })
    .catch(() => { loadError.value = true; })
    .finally(() => { loading.value = false; });
}
function confirmRemoval(id, event) {
  confirmingId.value = id;
  removeTrigger = event.currentTarget;
}
function cancelRemoval() {
  confirmingId.value = null;
  nextTick(() => removeTrigger?.focus());
}
function removeMyProduct(productId) {
  if (removingId.value !== null) return;
  setupAxiosAuth();
  removingId.value = productId;
  feedback.value = '';
  axios.delete(`${HOST_URL}api/v1/products/removeProduct/${productId}`)
    .then(async () => {
      products.value = products.value.filter(product => product.id !== productId);
      confirmingId.value = null;
      feedbackError.value = false;
      feedback.value = 'Product removed from your collection.';
      await nextTick();
      listHeading.value?.focus();
    })
    .catch(() => {
      feedbackError.value = true;
      feedback.value = 'We could not remove this product. Please try again.';
    })
    .finally(() => { removingId.value = null; });
}
onMounted(fetch);
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
    <AccountNav />
    <div class="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div><p class="mb-3 text-xs font-medium uppercase tracking-widest text-orange-800">YOUR SELLER SPACE</p><h1 class="font-serif text-4xl tracking-tight text-emerald-950 sm:text-5xl">Your collection.</h1><p class="mt-4 text-base text-stone-500">A home for your products. Keep every good find in view.</p></div>
      <RouterLink to="/addProduct" class="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-full bg-emerald-950 px-6 text-sm font-medium text-white hover:bg-emerald-800"><i class="pi pi-plus" aria-hidden="true"></i>Add a product</RouterLink>
    </div>
    <div role="status" aria-live="polite" :class="feedbackError ? 'text-red-800' : 'text-emerald-900'" class="mb-4 text-sm">{{ feedback }}</div>
    <div v-if="loading" role="status" class="space-y-4"><span class="sr-only">Loading your products</span><div v-for="row in 3" :key="row" aria-hidden="true" class="h-28 rounded-2xl bg-stone-100 motion-safe:animate-pulse"></div></div>
    <div v-else-if="loadError" role="alert" class="rounded-2xl bg-stone-50 px-6 py-12 text-center"><h2 class="font-serif text-3xl text-emerald-950">Let's try that again.</h2><p class="mt-3 text-stone-600">We couldn't load your collection.</p><button type="button" @click="fetch" class="mt-6 min-h-12 rounded-full bg-emerald-950 px-6 text-sm text-white">Reload products</button></div>
    <template v-else>
      <div class="overflow-hidden rounded-2xl border border-stone-200">
        <div class="flex flex-col justify-between gap-5 bg-stone-50 p-5 sm:flex-row sm:items-center sm:p-6">
          <h2 ref="listHeading" tabindex="-1" class="font-serif text-2xl text-emerald-950">All products <span class="ml-2 rounded-full bg-white px-3 py-1 font-sans text-sm text-stone-600">{{ products.length }}</span></h2>
          <div class="flex flex-col gap-3 sm:flex-row">
            <div class="relative"><label for="my-products-search" class="sr-only">Search your products</label><i class="pi pi-search pointer-events-none absolute left-4 top-4 text-stone-400" aria-hidden="true"></i><input id="my-products-search" v-model="query" type="search" placeholder="Find a product" class="min-h-12 w-full rounded-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm sm:w-56"></div>
            <label class="sr-only" for="my-products-sort">Sort products</label><select id="my-products-sort" v-model="sort" class="min-h-12 rounded-full border border-stone-300 bg-white px-4 text-sm"><option value="default">Default order</option><option value="name">Name: A-Z</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
          </div>
        </div>
        <div v-if="!products.length" class="px-6 py-16 text-center"><span class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-2xl text-orange-800"><i class="pi pi-image" aria-hidden="true"></i></span><h3 class="mt-5 font-serif text-3xl text-emerald-950">Your first good find starts here.</h3><p class="mx-auto mt-3 max-w-md text-stone-500">Add a photo, tell its story, and give your product a place in the collection.</p><RouterLink to="/addProduct" class="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full border border-stone-300 px-6 text-sm font-medium text-emerald-950">Create your first listing<i class="pi pi-arrow-right" aria-hidden="true"></i></RouterLink></div>
        <div v-else-if="!visibleProducts.length" class="p-12 text-center"><p class="text-stone-600">No products match your search.</p><button type="button" @click="query = ''" class="mt-3 min-h-11 text-sm text-emerald-950 underline underline-offset-4">Clear search</button></div>
        <template v-else>
          <div aria-hidden="true" class="hidden grid-cols-12 gap-4 border-t border-stone-200 px-6 py-4 text-xs uppercase tracking-widest text-stone-500 md:grid"><span class="col-span-6">Product</span><span class="col-span-2">Price</span><span class="col-span-4 text-right">Manage</span></div>
          <ul class="divide-y divide-stone-200">
            <li v-for="product in visibleProducts" :key="product.id" class="p-5 sm:p-6">
              <div class="grid items-center gap-4 md:grid-cols-12">
                <RouterLink :to="{ path: '/product', query: { id: product.id } }" class="group flex min-w-0 items-center gap-4 md:col-span-6">
                  <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-stone-100 p-2"><img v-if="product.imageData" :src="`data:${product.imageType};base64,${product.imageData}`" :alt="product.name" class="h-full w-full object-contain mix-blend-multiply"><i v-else class="pi pi-image text-xl text-stone-400" aria-hidden="true"></i></div>
                  <div class="min-w-0"><h3 class="break-words text-base font-medium text-stone-900 group-hover:underline">{{ product.name }}</h3><p class="mt-2 line-clamp-2 break-words text-sm leading-relaxed text-stone-500">{{ product.description }}</p></div>
                </RouterLink>
                <p class="text-base font-medium text-emerald-950 md:col-span-2">{{ formatPrice(product.price) }}</p>
                <div class="flex flex-wrap gap-2 md:col-span-4 md:justify-end">
                  <RouterLink :to="{ path: '/product', query: { id: product.id } }" class="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300 px-4 text-sm hover:bg-stone-50">View<i class="pi pi-arrow-up-right text-xs" aria-hidden="true"></i></RouterLink>
                  <button type="button" @click="confirmRemoval(product.id, $event)" :disabled="removingId !== null" :aria-expanded="confirmingId === product.id" :aria-label="'Remove ' + product.name" class="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-stone-500 hover:bg-red-50 hover:text-red-800 disabled:opacity-50"><i class="pi pi-trash" aria-hidden="true"></i>Remove</button>
                </div>
              </div>
              <div v-if="confirmingId === product.id" @keydown.esc="cancelRemoval" class="mt-5 flex flex-col justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center">
                <div><p class="break-words text-sm font-medium text-red-900">Remove "{{ product.name }}"?</p><p class="mt-1 text-sm text-red-800">This removes the product from your collection.</p></div>
                <div class="flex shrink-0 gap-2"><button type="button" @click="cancelRemoval" :disabled="removingId !== null" class="min-h-11 rounded-full border border-red-200 bg-white px-4 text-sm disabled:opacity-50">Keep product</button><button type="button" @click="removeMyProduct(product.id)" :disabled="removingId !== null" class="min-h-11 rounded-full bg-red-800 px-4 text-sm text-white hover:bg-red-900 disabled:opacity-50">{{ removingId === product.id ? 'Removing...' : 'Yes, remove' }}</button></div>
              </div>
            </li>
          </ul>
          <p role="status" class="border-t border-stone-200 px-6 py-4 text-sm text-stone-500">Showing {{ visibleProducts.length }} of {{ products.length }} products</p>
        </template>
      </div>
    </template>
  </section>
</template>
