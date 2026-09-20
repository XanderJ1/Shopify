<script setup>
import { onMounted, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { HOST_URL } from '../config';
import { useCounter } from '@/stores/counter';

const storeCounter = useCounter();
function setupAxiosAuth() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
const products = ref([]);
const paymentUrl = ref('');
const showPaymentUrl = ref(false);
const loading = ref(true);
const loadError = ref(false);
const paying = ref(false);
const removingIds = ref([]);
const feedback = ref('');
const formatPrice = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));

function fetch() {
  setupAxiosAuth();
  loading.value = true;
  loadError.value = false;
  return axios.get(`${HOST_URL}api/v1/users/cart`)
    .then(response => { products.value = response.data; })
    .catch(() => { loadError.value = true; })
    .finally(() => { loading.value = false; });
}
const totalPrice = computed(() => {
  let total = 0;
  products.value.forEach(product => { total += parseFloat(product.price); });
  return total.toFixed(2);
});
function pay() {
  if (paying.value || !products.value.length) return;
  const orderedProducts = products.value.map(product => product.id);
  setupAxiosAuth();
  paying.value = true;
  feedback.value = '';
  axios.post(`${HOST_URL}api/v1/order`, orderedProducts)
    .then(response => {
      paymentUrl.value = response.data;
      showPaymentUrl.value = true;
    })
    .catch(() => { feedback.value = 'We couldn?t start checkout. Please try again.'; })
    .finally(() => { paying.value = false; });
}
function removeFromCart(productId) {
  if (removingIds.value.includes(productId)) return;
  setupAxiosAuth();
  removingIds.value.push(productId);
  feedback.value = '';
  axios.post(`${HOST_URL}api/v1/products/removeFromCart/${productId}`)
    .then(async () => {
      showPaymentUrl.value = false;
      if (storeCounter.count > 0) storeCounter.decrement();
      await fetch();
    })
    .catch(() => { feedback.value = 'We couldn?t remove this item. Please try again.'; })
    .finally(() => { removingIds.value = removingIds.value.filter(id => id !== productId); });
}
onMounted(fetch);
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <RouterLink :to="{ path: '/', hash: '#featured-products' }" class="inline-flex min-h-11 items-center gap-3 text-sm text-stone-500 hover:text-emerald-950"><i class="pi pi-arrow-left" aria-hidden="true"></i>Keep discovering</RouterLink>
    <div class="mb-8 mt-4 flex flex-wrap items-baseline gap-4">
      <h1 class="font-serif text-4xl tracking-tight text-emerald-950 sm:text-5xl">Your shopping bag.</h1>
      <p v-if="!loading && !loadError" class="text-sm text-stone-500">{{ products.length }} {{ products.length === 1 ? 'item' : 'items' }}</p>
    </div>
    <div v-if="loading" role="status" class="space-y-4"><span class="sr-only">Loading your shopping bag</span><div v-for="item in 3" :key="item" aria-hidden="true" class="h-32 rounded-2xl bg-stone-100 motion-safe:animate-pulse"></div></div>
    <div v-else-if="loadError" class="rounded-2xl bg-stone-50 p-8 text-center">
      <h2 class="font-serif text-3xl text-emerald-950">Let?s try that again.</h2><p class="mt-4 text-stone-600">We couldn?t load your bag.</p>
      <button type="button" @click="fetch" class="mt-6 min-h-12 rounded-full bg-emerald-950 px-6 text-sm font-medium text-white">Try again</button>
    </div>
    <div v-else-if="!products.length" class="rounded-2xl bg-orange-50 px-6 py-16 text-center">
      <i class="pi pi-shopping-bag text-4xl text-orange-800" aria-hidden="true"></i>
      <h2 class="mt-6 font-serif text-3xl text-emerald-950">Room for something lovely.</h2>
      <p class="mx-auto mt-4 max-w-sm text-stone-600">Your bag is empty. Let?s find your next favourite.</p>
      <RouterLink :to="{ path: '/', hash: '#featured-products' }" class="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-emerald-950 px-6 py-3 text-sm text-white">Explore the collection <i class="pi pi-arrow-right" aria-hidden="true"></i></RouterLink>
    </div>
    <div v-else class="grid items-start gap-8 lg:grid-cols-3 lg:gap-12">
      <section aria-label="Items in your bag" class="min-w-0 lg:col-span-2">
        <div class="hidden justify-between border-b border-stone-200 pb-4 text-xs uppercase tracking-widest text-stone-500 sm:flex"><span>Your finds</span><span>Price</span></div>
        <ul class="divide-y divide-stone-200">
          <li v-for="(product, index) in products" :key="product.id + '-' + index" class="flex gap-4 py-6 sm:gap-6">
            <RouterLink :to="{ path: '/product', query: { id: product.id } }" class="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-stone-100 p-3 sm:h-32 sm:w-32">
              <img :src="`data:${product.imageType};base64,${product.imageData}`" :alt="product.name" class="h-full w-full object-contain mix-blend-multiply">
            </RouterLink>
            <div class="flex min-w-0 flex-1 flex-col">
              <div class="flex flex-col justify-between gap-2 sm:flex-row sm:gap-4">
                <RouterLink :to="{ path: '/product', query: { id: product.id } }" class="min-w-0 break-words text-base font-medium text-stone-900 hover:underline">{{ product.name }}</RouterLink>
                <p class="shrink-0 text-base font-medium text-emerald-950">{{ formatPrice(product.price) }}</p>
              </div>
              <p class="mt-3 text-sm text-stone-500">Quantity: 1</p>
              <button type="button" @click="removeFromCart(product.id)" :disabled="removingIds.includes(product.id) || paying" :aria-label="'Remove ' + product.name + ' from bag'" class="mt-auto inline-flex min-h-11 items-center self-start text-sm text-stone-500 underline decoration-stone-300 underline-offset-4 hover:text-red-800 disabled:opacity-50">{{ removingIds.includes(product.id) ? 'Removing?' : 'Remove' }}</button>
            </div>
          </li>
        </ul>
      </section>
      <aside aria-labelledby="summary-heading" class="rounded-2xl bg-stone-100 p-6 sm:p-8">
        <h2 id="summary-heading" class="font-serif text-2xl text-emerald-950">The finishing details</h2>
        <dl class="mt-6 space-y-4 border-b border-stone-300 pb-6 text-sm">
          <div class="flex justify-between gap-4"><dt class="text-stone-600">Subtotal</dt><dd>{{ formatPrice(totalPrice) }}</dd></div>
          <div class="flex justify-between gap-4"><dt class="text-stone-600">Discount</dt><dd class="text-emerald-800">?{{ formatPrice(15) }}</dd></div>
          <div class="flex justify-between gap-4"><dt class="text-stone-600">Shipping</dt><dd>{{ formatPrice(10) }}</dd></div>
        </dl>
        <div class="mt-6 flex flex-wrap items-baseline justify-between gap-3"><h3 class="text-base font-medium">Total</h3><p class="text-2xl font-medium text-emerald-950">{{ formatPrice(totalPrice - 15 + 10) }}</p></div>
        <button v-if="!showPaymentUrl" type="button" @click="pay" :disabled="paying || removingIds.length > 0" class="mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-emerald-950 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60">{{ paying ? 'Preparing checkout?' : 'Continue to checkout' }}<i class="pi pi-arrow-right" aria-hidden="true"></i></button>
        <div v-else role="status" class="mt-6">
          <a target="_blank" rel="noopener" :href="paymentUrl" class="flex min-h-14 items-center justify-center gap-3 rounded-full bg-emerald-950 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-800">Continue to payment <i class="pi pi-arrow-up-right" aria-hidden="true"></i></a>
          <p class="mt-3 text-center text-xs text-stone-500">Opens in a new tab</p>
        </div>
        <p role="alert" class="mt-4 text-sm text-red-800">{{ feedback }}</p>
      </aside>
    </div>
  </section>
</template>
