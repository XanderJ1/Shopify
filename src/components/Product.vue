<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { HOST_URL } from '../config';
import { useCounter } from '@/stores/counter';

const storeCounter = useCounter();
const product = ref({});
const loading = ref(true);
const loadError = ref(false);
const adding = ref(false);
const buying = ref(false);
const feedback = ref('');
const feedbackError = ref(false);
const props = defineProps({ id: { type: [String, Number], default: 2 } });
const formatPrice = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));

function get() {
  const id = props.id;
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  loading.value = true;
  loadError.value = false;
  feedback.value = '';
  axios.get(`${HOST_URL}api/v1/products/${id}`)
    .then(response => { if (id === props.id) product.value = response.data; })
    .catch(() => { if (id === props.id) loadError.value = true; })
    .finally(() => { if (id === props.id) loading.value = false; });
}
function buyIt(productId) {
  if (buying.value) return;
  buying.value = true;
  axios.post(`${HOST_URL}api/v1/products/buy`)
    .then(response => { alert(response.data); })
    .catch(() => { feedbackError.value = true; feedback.value = 'We couldn?t complete your request. Please try again.'; })
    .finally(() => { buying.value = false; });
}
function addToCart(id) {
  if (adding.value) return;
  adding.value = true;
  feedback.value = '';
  axios.post(`${HOST_URL}api/v1/products/addToCart/${id}`)
    .then(() => {
      storeCounter.increment();
      feedbackError.value = false;
      feedback.value = 'Added to your shopping bag.';
    })
    .catch(() => { feedbackError.value = true; feedback.value = 'We couldn?t add this item. Please try again.'; })
    .finally(() => { adding.value = false; });
}
watch(() => props.id, get, { immediate: true });
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:pb-16 lg:px-8">
    <nav aria-label="Breadcrumb" class="mb-6 flex flex-wrap items-center gap-3 text-sm text-stone-500">
      <RouterLink to="/" class="inline-flex min-h-11 items-center hover:text-emerald-950">Home</RouterLink>
      <i class="pi pi-angle-right text-xs" aria-hidden="true"></i>
      <RouterLink :to="{ path: '/', hash: '#featured-products' }" class="inline-flex min-h-11 items-center hover:text-emerald-950">The collection</RouterLink>
      <template v-if="!loading && !loadError"><i class="pi pi-angle-right text-xs" aria-hidden="true"></i><span aria-current="page" class="min-w-0 break-words text-stone-800">{{ product.name }}</span></template>
    </nav>
    <div v-if="loading" role="status" class="grid gap-8 lg:grid-cols-2">
      <span class="sr-only">Loading product</span>
      <div class="aspect-square rounded-2xl bg-stone-100 motion-safe:animate-pulse"></div>
      <div aria-hidden="true" class="space-y-6 py-12 motion-safe:animate-pulse"><div class="h-8 w-3/4 rounded bg-stone-100"></div><div class="h-5 w-1/4 rounded bg-stone-100"></div><div class="h-32 rounded bg-stone-100"></div></div>
    </div>
    <div v-else-if="loadError" class="rounded-2xl bg-stone-50 px-6 py-16 text-center">
      <h1 class="font-serif text-3xl text-emerald-950">This find is taking a moment.</h1>
      <p class="mt-4 text-stone-600">We couldn?t load this product. Please try again.</p>
      <button @click="get" type="button" class="mt-6 min-h-12 rounded-full bg-emerald-950 px-6 text-sm text-white">Try again</button>
    </div>
    <div v-else class="grid gap-8 lg:grid-cols-2 lg:gap-16">
      <div class="flex aspect-square items-center justify-center rounded-2xl bg-stone-100 p-8 sm:p-12">
        <img v-if="product.imageData" :src="`data:${product.imageType};base64,${product.imageData}`" :alt="product.name" class="h-full w-full object-contain mix-blend-multiply">
        <i v-else class="pi pi-image text-5xl text-stone-400" aria-hidden="true"></i>
      </div>
      <div class="min-w-0 self-center py-4">
        <p class="text-xs font-medium uppercase tracking-widest text-orange-800">A ShopEase find</p>
        <h1 class="mt-4 break-words font-serif text-4xl leading-tight tracking-tight text-emerald-950 sm:text-5xl">{{ product.name }}</h1>
        <p v-if="product.price != null" class="mt-6 text-2xl font-medium text-emerald-950">{{ formatPrice(product.price) }}</p>
        <div class="my-8 border-t border-stone-200 pt-6">
          <h2 class="text-sm font-medium text-stone-900">The details</h2>
          <p class="mt-3 max-w-prose whitespace-pre-line break-words text-base leading-relaxed text-stone-600">{{ product.description }}</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <button type="button" @click="addToCart(product.id)" :disabled="adding" class="flex min-h-14 items-center justify-center gap-3 rounded-full bg-emerald-950 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"><i :class="adding ? 'pi pi-spinner motion-safe:animate-spin' : 'pi pi-shopping-bag'" aria-hidden="true"></i>{{ adding ? 'Adding?' : 'Add to bag' }}</button>
          <button type="button" @click="buyIt(product.id)" :disabled="buying" class="min-h-14 rounded-full border border-emerald-950 px-6 py-3 text-sm font-medium text-emerald-950 hover:bg-stone-100 disabled:opacity-60">{{ buying ? 'One moment?' : 'Buy now' }}</button>
        </div>
        <p role="status" aria-live="polite" class="mt-4 text-sm" :class="feedbackError ? 'text-red-800' : 'text-emerald-900'">{{ feedback }}</p>
        <RouterLink to="/cart" class="mt-4 inline-flex min-h-11 items-center gap-3 text-sm text-stone-600 underline underline-offset-4">View shopping bag <i class="pi pi-arrow-right" aria-hidden="true"></i></RouterLink>
      </div>
    </div>
  </section>
</template>
