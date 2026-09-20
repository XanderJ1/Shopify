<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { HOST_URL } from '../config';
import AccountNav from './AccountNav.vue';

const seller = localStorage.getItem('role') === 'SELLER';
const orders = ref([]);
const loading = ref(true);
const loadError = ref(false);
const query = ref('');
const formatPrice = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
const orderName = order => String(order.orderId ?? order.id ?? '');
const items = order => Array.isArray(order.products) ? order.products : [];
const subtotal = order => items(order).reduce((sum, product) => sum + (Number(product.price) || 0), 0);
const itemCount = computed(() => orders.value.reduce((sum, order) => sum + items(order).length, 0));
const visibleOrders = computed(() => {
  const term = query.value.trim().toLowerCase();
  return orders.value.filter(order => [orderName(order), ...items(order).map(product => product.name)].join(' ').toLowerCase().includes(term));
});
function fetch() {
  loading.value = true;
  loadError.value = false;
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('role');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let url = '';
  if (user === 'BUYER') url = `${HOST_URL}api/v1/order/buyerOrders`;
  else url = `${HOST_URL}api/v1/order/sellerOrders`;
  axios.get(url)
    .then(response => { orders.value = response.data; })
    .catch(() => { loadError.value = true; })
    .finally(() => { loading.value = false; });
}
onMounted(fetch);
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
    <AccountNav />
    <div class="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <p class="mb-3 text-xs font-medium uppercase tracking-widest text-orange-800">{{ seller ? 'YOUR SELLER SPACE' : 'YOUR SHOPEASE' }}</p>
        <h1 class="font-serif text-4xl tracking-tight text-emerald-950 sm:text-5xl">{{ seller ? 'Orders, at a glance.' : 'Your finds. All together.' }}</h1>
        <p class="mt-4 max-w-xl text-base text-stone-500">{{ seller ? 'Keep every order and its product details in view.' : 'A little history of the things you love. Find your orders and revisit the details.' }}</p>
      </div>
      <RouterLink :to="seller ? '/myProducts' : '/'" class="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-full border border-stone-300 bg-white px-5 text-sm font-medium text-emerald-950 hover:bg-stone-50">{{ seller ? 'View my products' : 'Keep discovering' }}<i class="pi pi-arrow-up-right" aria-hidden="true"></i></RouterLink>
    </div>

    <div v-if="loading" role="status" class="space-y-4"><span class="sr-only">Loading orders</span><div v-for="row in 3" :key="row" aria-hidden="true" class="h-40 rounded-2xl bg-stone-100 motion-safe:animate-pulse"></div></div>
    <div v-else-if="loadError" role="alert" class="rounded-2xl border border-stone-200 bg-stone-50 px-6 py-12 text-center">
      <i class="pi pi-refresh text-2xl text-stone-400" aria-hidden="true"></i><h2 class="mt-4 font-serif text-3xl text-emerald-950">Let's try that again.</h2><p class="mt-3 text-stone-600">We couldn't load your orders.</p><button type="button" @click="fetch" class="mt-6 min-h-12 rounded-full bg-emerald-950 px-6 text-sm text-white hover:bg-emerald-800">Reload orders</button>
    </div>
    <div v-else-if="!orders.length" class="rounded-2xl bg-orange-50 px-6 py-16 text-center">
      <span class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-orange-800"><i class="pi pi-box" aria-hidden="true"></i></span>
      <h2 class="mt-6 font-serif text-3xl text-emerald-950">{{ seller ? 'Ready for your first order.' : 'Your story starts here.' }}</h2>
      <p class="mx-auto mt-3 max-w-md text-stone-600">{{ seller ? 'Orders for your products will appear here as they come in.' : 'Your orders will appear here once you make a purchase.' }}</p>
      <RouterLink :to="seller ? '/myProducts' : '/'" class="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-emerald-950 px-6 text-sm text-white">{{ seller ? 'Manage products' : 'Explore the collection' }}<i class="pi pi-arrow-right" aria-hidden="true"></i></RouterLink>
    </div>
    <template v-else>
      <div class="mb-8 grid gap-4 sm:grid-cols-3">
        <div class="flex items-center gap-4 rounded-2xl bg-emerald-950 p-5 text-white"><i class="pi pi-box text-2xl text-emerald-200" aria-hidden="true"></i><div><p class="text-3xl font-medium">{{ orders.length }}</p><p class="mt-1 text-sm text-emerald-100">Total orders</p></div></div>
        <div class="flex items-center gap-4 rounded-2xl border border-stone-200 p-5"><i class="pi pi-shopping-bag text-2xl text-stone-400" aria-hidden="true"></i><div><p class="text-3xl font-medium text-emerald-950">{{ itemCount }}</p><p class="mt-1 text-sm text-stone-500">Items across orders</p></div></div>
        <div class="flex flex-col justify-center rounded-2xl bg-orange-50 p-5"><p class="font-serif text-xl text-emerald-950">Every detail, in one place.</p><p class="mt-2 text-sm text-stone-600">Open an order to see its items.</p></div>
      </div>
      <div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 class="font-serif text-2xl text-emerald-950">Order history <span class="ml-2 font-sans text-sm text-stone-500">({{ visibleOrders.length }})</span></h2>
        <div class="relative w-full sm:max-w-sm"><label for="order-search" class="sr-only">Search by order number or product</label><i class="pi pi-search pointer-events-none absolute left-4 top-4 text-stone-400" aria-hidden="true"></i><input id="order-search" v-model="query" type="search" placeholder="Order number or product name" class="min-h-12 w-full rounded-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm"></div>
      </div>
      <p role="status" class="sr-only">{{ visibleOrders.length }} matching orders</p>
      <div v-if="!visibleOrders.length" class="rounded-2xl border border-dashed border-stone-300 p-10 text-center"><p class="text-stone-600">No orders match your search.</p><button type="button" @click="query = ''" class="mt-3 min-h-11 text-sm font-medium text-emerald-950 underline underline-offset-4">Clear search</button></div>
      <div v-else class="space-y-4">
        <details v-for="(order, orderIndex) in visibleOrders" :key="order.id ?? order.orderId ?? orderIndex" class="group overflow-hidden rounded-2xl border border-stone-200 bg-white open:border-stone-300">
          <summary class="cursor-pointer list-none p-5 marker:hidden sm:p-6 [&::-webkit-details-marker]:hidden">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex min-w-0 items-center gap-4"><span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-emerald-950"><i class="pi pi-box" aria-hidden="true"></i></span><div class="min-w-0"><p class="text-xs uppercase tracking-widest text-stone-500">Order</p><h3 class="mt-1 break-all text-base font-medium text-emerald-950">#{{ orderName(order) }}</h3></div></div>
              <div class="flex items-center gap-6"><div class="text-right"><p class="text-base font-medium text-stone-900">{{ formatPrice(subtotal(order)) }}</p><p class="mt-1 text-xs text-stone-500">Item subtotal</p></div><i class="pi pi-chevron-down text-xs text-stone-500 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true"></i></div>
            </div>
            <div class="mt-5 flex items-center justify-between gap-4 border-t border-stone-100 pt-4">
              <div class="flex items-center gap-3"><div class="flex -space-x-2" aria-hidden="true"><span v-for="(product, index) in items(order).slice(0, 3)" :key="index" class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-stone-100"><img v-if="product.imageData" :src="`data:${product.imageType};base64,${product.imageData}`" alt="" class="h-full w-full object-contain"><i v-else class="pi pi-image text-stone-400"></i></span></div><p class="text-sm text-stone-500">{{ items(order).length }} {{ items(order).length === 1 ? 'item' : 'items' }}</p></div>
              <span class="text-sm font-medium text-emerald-950"><span class="group-open:hidden">View details</span><span class="hidden group-open:inline">Hide details</span></span>
            </div>
          </summary>
          <ul class="divide-y divide-stone-200 border-t border-stone-200 bg-stone-50 px-5 sm:px-6">
            <li v-for="(product, index) in items(order)" :key="product.id + '-' + index" class="flex gap-4 py-5">
              <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white p-2"><img v-if="product.imageData" :src="`data:${product.imageType};base64,${product.imageData}`" :alt="product.name" class="h-full w-full object-contain"><i v-else class="pi pi-image text-stone-400" aria-hidden="true"></i></div>
              <div class="min-w-0 flex-1"><h4 class="break-words text-base font-medium text-stone-900">{{ product.name }}</h4><p class="mt-1 line-clamp-2 break-words text-sm leading-relaxed text-stone-500">{{ product.description }}</p><p class="mt-2 text-sm font-medium text-emerald-950 sm:hidden">{{ formatPrice(Number(product.price) || 0) }}</p></div>
              <p class="hidden shrink-0 text-sm font-medium text-emerald-950 sm:block">{{ formatPrice(Number(product.price) || 0) }}</p>
            </li>
          </ul>
        </details>
      </div>
    </template>
  </section>
</template>
