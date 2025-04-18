<script setup>

import { onMounted, ref } from 'vue';
import axios from 'axios';
console.log('Hello');

const products = ref([]);

function fetch(){
    
const token =  localStorage.getItem('token');
axios.defaults. headers. common ['Authorization'] = `Bearer ${token}`;
axios.get(`http://localhost:8080/api/v1/users/cart`)
.then((response) => {
    console.log(response.data)
    products.value = response.data
})
}   

onMounted(() => fetch())

</script>

<template>
    <h1 class="text-left text-3xl px-25 pt-10">Cart</h1>

    <!----    Database Cart     ---->

    <div class="flex">
        <div class="flex flex-col min-w-280">
        <div v-for="product in products" class="flex container mx-auto px-6 py-4 border-gray-400 border-b-1">
        <div class="cartproduct flex container mx-auto px-6 py-4">
        <div class="">
            <img class="max-w-60" :src="`data:${product.imageType};base64,${product.imageData}`" alt="">

        </div>
        <div class="desc text-xl px-15 max-w-200">
            <p>{{ product.name }} </p>
            <div class="flex items-center space-x-2">
                <div class="text-xl py-6">
                    Size: M
                </div>
                <div class="text-xl">
                    Color: Grey
                </div>
            </div>
            <div class="addMinus text-xl">
                <button class="bg-gray-200 px-2">-</button>
                <input type="text" class="w-10 text-center" value="1">
                <button class="bg-gray-200 px-2">+</button>

            </div>
        </div>
        <div class="text-2xl py-4 items-center">
            ${{product.price}}
        </div>
    </div>
    </div>
    </div>
    <div class="bg-white min-w-100 px-10 text-center text-2xl">
    <h2 class="text-2xl">Summary</h2>
    <h3>Buy Now</h3>

    <ul></ul>
    <div v-for="product in products">
        <span>{{product.name}} {{ product.price }}</span>

    </div>
    </div>
    </div>
    
</template>

<style scoped>

</style>