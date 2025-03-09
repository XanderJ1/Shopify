<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';

const isEmpty = ref()
const products = ref([])

function search(searchQuery){
    const token =  localStorage.getItem('token');
    axios.defaults. headers. common ['Authorization'] = `Bearer ${token}`;
    axios.get(`http://localhost:8080/api/v1/products/search?name=${searchQuery}`)
    .then((response) => {
        products.value = response.data;
        isEmpty.value = true
        console.log(response.data);
        console.log(products.length);
        console.log(products);
    })
    .catch((error) => {
        console.log(error);
    });
}

</script>

<template>
    <div class="container mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
            <img src="../assets/images/logo.svg" alt="">
        </div>
        <div class="flex items-center text-xl   space-x-8">
            <a href="#">Categories</a>
            <a href="#">Deals </a>
            <a href="#">What's New </a>
            <RouterLink to="/myProducts"> My Product</RouterLink>
            <RouterLink to="/addProduct">Add Product  </RouterLink>
            <div class="search">
                <label class="input">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                <input v-model="searchQuery" type="search" required placeholder="Search" @keydown.enter="search(searchQuery)">
            </label>
            <div v-if="products.length>=1"  class="suggestions">
                <div v-for="product in products">
                    <ul>
                        <li class="link">
                            <RouterLink :to="{path: '/product',query: {id: product.id}}">
                                {{product.name}}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
        <div class="flex items-center text-xl space-x-6">
            <div class="flex items-center space-x-2">
            <img src="../assets/images/user.svg" class="w-5 h-5" alt="">
            <span><RouterLink to="/signup">SignUp  </RouterLink></span>
            </div>
            <div class="flex items-center text-xl space-x-2">
            <img src="../assets/images/shopping-cart.svg" class="w-5 h-5" alt="">
            <span>Cart</span>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
</style>