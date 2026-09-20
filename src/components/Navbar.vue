<script setup>
import { ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { HOST_URL } from '../config';
import axios from 'axios';
import { useCounter } from '@/stores/counter';

const storeCounter = useCounter();
const route = useRoute();
const products = ref([]);
const role = ref(localStorage.getItem('role'));
const searchQuery = ref('');
const accountOpen = ref(false);
const resultsOpen = ref(false);
const searching = ref(false);
const searchError = ref(false);
let latestSearch = 0;
const categories = ['All', 'Tech', 'Style', 'Home', 'Beauty', 'Accessories'];

function closeAccount(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) accountOpen.value = false;
}
function logout() {
  localStorage.setItem('token', '');
  localStorage.setItem('role', '');
  localStorage.setItem('initials', '');
  location.reload();
}
function search(searchQuery) {
  const requestId = ++latestSearch;
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  searching.value = true;
  searchError.value = false;
  resultsOpen.value = true;
  axios.get(`${HOST_URL}api/v1/products/search?name=${searchQuery}`)
    .then(response => { if (requestId === latestSearch) products.value = response.data; })
    .catch(() => { if (requestId === latestSearch) searchError.value = true; })
    .finally(() => { if (requestId === latestSearch) searching.value = false; });
}
function getCart() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.get(`${HOST_URL}api/v1/order/cartSize`)
    .then(response => { console.log(response.data); })
    .catch(error => { console.log(error); });
}
watch(() => route.fullPath, () => {
  accountOpen.value = false;
  resultsOpen.value = false;
});
</script>

<template>
  <header class="relative z-30 border-b border-stone-200 bg-white">
    <div class="bg-emerald-950 text-orange-50">
      <div class="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-xs tracking-wide sm:justify-between sm:px-6 lg:px-8">
        <p>Good finds. Great days. A little more you.</p>
        <RouterLink :to="{ path: '/', query: { category: 'All' }, hash: '#featured-products' }" class="hidden items-center gap-2 underline underline-offset-4 sm:inline-flex">Discover the collection <i class="pi pi-arrow-right text-xs" aria-hidden="true"></i></RouterLink>
      </div>
    </div>
    <nav aria-label="Main navigation" class="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-4 px-4 py-5 sm:px-6 lg:px-8">
      <RouterLink to="/" aria-label="ShopEase home" class="order-1 inline-flex min-h-12 shrink-0 items-center font-serif text-4xl tracking-tight text-emerald-950">ShopEase<span class="text-orange-700">.</span></RouterLink>

      <div v-if="role !== 'SELLER'" class="relative order-3 w-full lg:order-2 lg:min-w-0 lg:flex-1" @keydown.esc="resultsOpen = false; $refs.searchInput.focus()">
        <form role="search" @submit.prevent="search(searchQuery)" class="flex min-h-12 items-center rounded-full border border-stone-300 bg-stone-50 p-1 transition-colors focus-within:border-emerald-900">
          <label for="product-search" class="sr-only">Search products</label>
          <input ref="searchInput" id="product-search" v-model="searchQuery" type="search" required placeholder="Find your next favourite?" class="min-h-11 min-w-0 flex-1 rounded-full bg-transparent pl-5 pr-2 text-base text-stone-900 placeholder:text-stone-500" :aria-expanded="resultsOpen" aria-controls="search-results">
          <button type="submit" class="h-11 w-11 shrink-0 rounded-full bg-emerald-950 text-white hover:bg-emerald-800" aria-label="Search products"><i class="pi pi-search" aria-hidden="true"></i></button>
        </form>
        <section v-if="resultsOpen" id="search-results" aria-label="Search results" class="absolute z-40 mt-3 max-h-96 w-full overflow-y-auto rounded-2xl border border-stone-200 bg-white p-3 shadow-xl">
          <div class="flex items-center justify-between gap-4 px-2">
            <p role="status" class="text-sm text-stone-500">{{ searching ? 'Searching?' : searchError ? 'Search unavailable' : products.length + ' results' }}</p>
            <button type="button" class="h-11 w-11 rounded-full text-stone-600 hover:bg-stone-100" aria-label="Close search results" @click="resultsOpen = false; $refs.searchInput.focus()"><i class="pi pi-times" aria-hidden="true"></i></button>
          </div>
          <p v-if="searchError" role="alert" class="p-4 text-sm text-red-800">We couldn?t search right now. Please try again.</p>
          <p v-else-if="!searching && !products.length" class="p-4 text-stone-600">No finds just yet. Try another product name.</p>
          <ul v-else-if="!searching">
            <li v-for="product in products" :key="product.id">
              <RouterLink :to="{ path: '/product', query: { id: product.id } }" class="flex min-h-16 items-center gap-4 rounded-xl p-3 hover:bg-stone-50">
                <img v-if="product.imageData" :src="`data:${product.imageType};base64,${product.imageData}`" alt="" class="h-12 w-12 shrink-0 rounded-lg bg-stone-100 object-contain">
                <span class="min-w-0 flex-1 break-words text-sm font-medium">{{ product.name }}</span>
                <span class="text-sm text-stone-600">${{ product.price }}</span>
              </RouterLink>
            </li>
          </ul>
        </section>
      </div>

      <div class="order-2 ml-auto flex flex-wrap items-center justify-end gap-2 text-sm lg:order-3">
        <template v-if="role === 'SELLER'">
          <RouterLink to="/addProduct" active-class="bg-emerald-950 text-white hover:bg-emerald-800" class="inline-flex min-h-11 items-center rounded-full px-3 font-medium hover:bg-stone-100">Add product</RouterLink>
          <RouterLink to="/myProducts" active-class="bg-stone-100 font-medium text-emerald-950" class="inline-flex min-h-11 items-center rounded-full px-3 hover:bg-stone-100">My products</RouterLink>
        </template>
        <RouterLink v-if="role === 'BUYER' || role === 'SELLER'" to="/orders" active-class="bg-stone-100 font-medium text-emerald-950" class="inline-flex min-h-11 items-center rounded-full px-3 hover:bg-stone-100">Orders</RouterLink>
        <div v-if="role === 'SELLER' || role === 'BUYER'" class="relative" @keydown.esc="accountOpen = false; $refs.accountButton.focus()" @focusout="closeAccount">
          <button ref="accountButton" type="button" @click="accountOpen = !accountOpen" :aria-expanded="accountOpen" aria-controls="account-actions" class="inline-flex min-h-11 items-center gap-2 rounded-full px-3 hover:bg-stone-100"><i class="pi pi-user" aria-hidden="true"></i><span class="hidden sm:inline">Account</span><span class="sr-only sm:hidden">Account</span></button>
          <div v-if="accountOpen" id="account-actions" class="absolute right-0 z-40 mt-3 w-48 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl">
            <RouterLink to="/orders" class="flex min-h-12 items-center rounded-lg px-3 hover:bg-stone-100">My orders</RouterLink>
            <button type="button" @click="logout()" class="min-h-12 w-full rounded-lg px-3 text-left text-red-800 hover:bg-red-50">Log out</button>
          </div>
        </div>
        <template v-else>
          <RouterLink to="/login" class="inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-medium text-emerald-950 hover:bg-stone-100"><i class="pi pi-user" aria-hidden="true"></i>Sign in</RouterLink>
          <RouterLink to="/signup" class="hidden min-h-11 items-center rounded-full border border-stone-300 px-4 font-medium text-emerald-950 hover:bg-stone-100 sm:inline-flex">Join us</RouterLink>
        </template>
        <RouterLink v-if="role !== 'SELLER'" :to="role === 'BUYER' ? '/cart' : '/login'" class="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-stone-100" :aria-label="'Shopping bag, ' + storeCounter.count + ' items'">
          <i class="pi pi-shopping-bag text-xl" aria-hidden="true"></i><span v-if="storeCounter.count" class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-800 px-1 text-xs text-white">{{ storeCounter.count }}</span>
        </RouterLink>
      </div>
    </nav>
    <nav aria-label="Shop collections" class="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 pb-2 text-sm sm:gap-8 sm:px-6 lg:px-8">
      <RouterLink v-for="category in categories" :key="category" :to="{ path: '/', query: { category }, hash: '#featured-products' }" class="inline-flex min-h-11 shrink-0 items-center border-b-2 px-1 transition-colors" :class="route.path === '/' && (route.query.category || 'All') === category ? 'border-orange-800 font-medium text-orange-800' : 'border-transparent text-stone-600 hover:border-stone-400 hover:text-stone-900'">
        <i v-if="category === 'All'" class="pi pi-th-large mr-2 text-xs" aria-hidden="true"></i>{{ category === 'All' ? 'All finds' : category === 'Home' ? 'Home & living' : category }}
      </RouterLink>
    </nav>
  </header>
</template>
