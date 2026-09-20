<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { HOST_URL } from '../config';
import { useCounter } from '@/stores/counter';

const storeCounter = useCounter();
const route = useRoute();
const router = useRouter();
const products = ref([]);
const loading = ref(true);
const loadError = ref(false);
const pendingIds = ref([]);
const feedback = ref('');
const feedbackError = ref(false);
const sort = ref('featured');
const categories = ['All', 'Tech', 'Style', 'Home', 'Beauty', 'Accessories'];
const selectedCategory = computed(() => categories.includes(route.query.category) ? route.query.category : 'All');
const categoryTerms = {
  Tech: /tech|electronic|phone|pod|laptop|computer|tablet|headphone|speaker|console|vision|macbook|camera/i,
  Style: /fashion|cloth|shirt|sweater|hoodie|jacket|dress|shoe|sneaker|jordan|air.?force|trouser|jeans|apparel/i,
  Home: /home|furniture|decor|kitchen|lamp|chair|table|bedding|pillow|candle|grocer/i,
  Beauty: /beauty|skin|cream|makeup|cosmetic|perfume|serum|shampoo|lotion/i,
  Accessories: /accessor|watch|jewel|necklace|bag|wallet|ring|bracelet|sunglass/i,
};
const visibleProducts = computed(() => {
  const list = products.value.filter(product => selectedCategory.value === 'All' ||
    categoryTerms[selectedCategory.value].test([product.name, product.description, product.category?.name || product.category || ''].join(' ')));
  if (sort.value === 'price-low') return [...list].sort((a, b) => Number(a.price) - Number(b.price));
  if (sort.value === 'price-high') return [...list].sort((a, b) => Number(b.price) - Number(a.price));
  if (sort.value === 'name') return [...list].sort((a, b) => String(a.name).localeCompare(String(b.name)));
  return list;
});
const formatPrice = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));

function chooseCategory(category) {
  router.replace({ path: '/', query: { ...route.query, category }, hash: '#featured-products' });
}
function addToCart(id) {
  if (pendingIds.value.includes(id)) return;
  pendingIds.value.push(id);
  feedback.value = '';
  axios.post(`${HOST_URL}api/v1/products/addToCart/${id}`)
    .then(() => {
      storeCounter.increment();
      feedbackError.value = false;
      feedback.value = 'Added to your cart.';
    })
    .catch(() => {
      feedbackError.value = true;
      feedback.value = 'We couldn?t add this item. Please try again.';
    })
    .finally(() => { pendingIds.value = pendingIds.value.filter(item => item !== id); });
}
function fetch() {
  loading.value = true;
  loadError.value = false;
  axios.get(`${HOST_URL}api/v1/products`)
    .then(response => { products.value = response.data; })
    .catch(() => { loadError.value = true; })
    .finally(() => { loading.value = false; });
}
onMounted(fetch);
</script>

<template>
  <section id="featured-products" tabindex="-1" aria-labelledby="featured-heading" class="mx-auto max-w-7xl scroll-mt-6 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p class="mb-2 text-xs font-medium uppercase tracking-widest text-stone-500">THE GOOD-FINDS COLLECTION</p>
        <h2 id="featured-heading" class="font-serif text-3xl tracking-tight text-emerald-950 sm:text-4xl">Find your next favourite.</h2>
        <p class="mt-3 text-base text-stone-500">A little discovery. A lot to love.</p>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <label for="product-sort" class="shrink-0 text-stone-500">Sort by</label>
        <select id="product-sort" v-model="sort" class="min-h-11 rounded-full border border-stone-300 bg-white px-4 pr-8 text-stone-800">
          <option value="featured">Featured</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="name">Name: A?Z</option>
        </select>
      </div>
    </div>
    <div class="mb-8 mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5">
      <div class="flex flex-wrap gap-2" aria-label="Filter products by category">
        <button v-for="category in categories" :key="category" type="button" @click="chooseCategory(category)" :aria-pressed="selectedCategory === category" class="min-h-11 rounded-full border px-4 py-2 text-sm transition-colors" :class="selectedCategory === category ? 'border-emerald-950 bg-emerald-950 text-white' : 'border-stone-200 bg-white text-stone-600 hover:border-stone-500'">{{ category === 'All' ? 'All finds' : category }}</button>
      </div>
      <p v-if="!loading && !loadError" role="status" class="text-sm text-stone-500">{{ visibleProducts.length }} {{ visibleProducts.length === 1 ? 'find' : 'finds' }}</p>
    </div>

    <div v-if="loading" role="status">
      <span class="sr-only">Loading products</span>
      <div aria-hidden="true" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
        <div v-for="item in 8" :key="item" class="motion-safe:animate-pulse">
          <div class="aspect-square rounded-xl bg-stone-100"></div>
          <div class="mt-4 h-4 w-3/4 rounded bg-stone-100"></div>
          <div class="mt-3 h-4 w-1/3 rounded bg-stone-100"></div>
        </div>
      </div>
    </div>
    <div v-else-if="loadError" class="rounded-2xl border border-stone-200 bg-stone-50 px-6 py-12 text-center">
      <i class="pi pi-shopping-bag text-3xl text-stone-400" aria-hidden="true"></i>
      <h3 class="mt-4 font-serif text-2xl text-emerald-950">Our shelves are taking a moment.</h3>
      <p class="mx-auto mt-3 max-w-md text-stone-600">We couldn?t load the collection. Please try again in a moment.</p>
      <button type="button" @click="fetch" class="mt-6 min-h-12 rounded-full bg-emerald-950 px-6 text-sm font-medium text-white hover:bg-emerald-800">Try again <i class="pi pi-refresh ml-3" aria-hidden="true"></i></button>
    </div>
    <div v-else-if="!visibleProducts.length" class="rounded-2xl bg-stone-50 px-6 py-12 text-center">
      <h3 class="font-serif text-2xl text-emerald-950">{{ products.length ? 'A new discovery awaits.' : 'Good things are on their way.' }}</h3>
      <p class="mt-3 text-stone-600">{{ products.length ? 'There are no matches in this collection yet. Explore all our finds.' : 'Check back soon for products from our sellers.' }}</p>
      <button v-if="selectedCategory !== 'All'" type="button" @click="chooseCategory('All')" class="mt-6 min-h-12 rounded-full border border-stone-400 px-6 text-sm font-medium text-emerald-950 hover:bg-white">See all finds</button>
    </div>
    <div v-else class="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
      <article v-for="product in visibleProducts" :key="product.id" class="group flex min-w-0 flex-col">
        <RouterLink :to="{ path: '/product', query: { id: product.id } }" class="block">
          <div class="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-stone-100 p-4 sm:p-6">
            <img v-if="product.imageData" class="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" :src="`data:${product.imageType};base64,${product.imageData}`" :alt="product.name" loading="lazy">
            <i v-else class="pi pi-image text-4xl text-stone-400" aria-hidden="true"></i>
          </div>
          <h3 class="mt-4 break-words text-base font-medium leading-snug text-stone-900 group-hover:underline decoration-stone-400 underline-offset-4">{{ product.name }}</h3>
        </RouterLink>
        <div class="mt-auto pt-3">
          <p class="text-base font-semibold text-emerald-950">{{ formatPrice(product.price) }}</p>
          <button type="button" @click="addToCart(product.id)" :disabled="pendingIds.includes(product.id)" :aria-label="'Add ' + product.name + ' to cart'" class="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-stone-300 px-3 py-2 text-sm font-medium text-emerald-950 transition-colors hover:border-emerald-950 hover:bg-emerald-950 hover:text-white disabled:opacity-60">
            <i :class="pendingIds.includes(product.id) ? 'pi pi-spinner motion-safe:animate-spin' : 'pi pi-plus'" aria-hidden="true"></i>{{ pendingIds.includes(product.id) ? 'Adding?' : 'Add to cart' }}
          </button>
        </div>
      </article>
    </div>
    <div role="status" aria-live="polite" aria-atomic="true" class="mt-4 text-sm" :class="feedbackError ? 'text-red-800' : 'text-emerald-900'">{{ feedback }}</div>
  </section>

  <section aria-labelledby="edit-heading" class="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pb-16 lg:px-8">
    <div class="grid overflow-hidden rounded-2xl bg-orange-50 md:grid-cols-2">
      <div class="relative flex min-h-72 items-center justify-center overflow-hidden bg-stone-200 p-8 sm:min-h-80">
        <div class="absolute inset-8 rounded-full bg-orange-100"></div>
        <img src="../assets/images/Apple/homepod.png" alt="A speaker for your everyday listening" loading="lazy" class="relative h-64 w-full object-contain mix-blend-multiply">
      </div>
      <div class="flex flex-col items-start justify-center p-6 sm:p-10 lg:p-12">
        <p class="text-xs font-medium uppercase tracking-widest text-orange-800">Make room for the good things</p>
        <h2 id="edit-heading" class="mt-4 font-serif text-4xl leading-tight tracking-tight text-emerald-950 sm:text-5xl">Little upgrades.<br><em>Everyday joy.</em></h2>
        <p class="mt-5 max-w-sm text-base leading-relaxed text-stone-600">Something for your space. Something for yourself. Find the details that turn the ordinary into your favourite part of the day.</p>
        <RouterLink :to="{ path: '/', query: { category: 'Home' }, hash: '#featured-products' }" class="mt-6 inline-flex min-h-12 items-center gap-4 rounded-full border border-emerald-950 px-6 py-3 text-sm font-medium text-emerald-950 hover:bg-emerald-950 hover:text-white">Explore home <i class="pi pi-arrow-up-right" aria-hidden="true"></i></RouterLink>
      </div>
    </div>
  </section>
</template>
