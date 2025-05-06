<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { HOST_URL } from '../config';

import { RouterLink } from 'vue-router';

const orders = ref([]);

function fetch(){

    const token =  localStorage.getItem('token');
    const user = localStorage.getItem('role');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let url = '';

    if(user === 'BUYER'){
        url = `${HOST_URL}api/v1/order/buyerOrders`;
    }else{   
        url = `${HOST_URL}api/v1/order/sellerOrders`;
    }
    axios.get(url)
    .then((response) => {
        orders.value = response.data;
        console.log(orders.value);
    })
    .catch((error) => {
        console.log(error);
    });    
}

onMounted(() => {
    fetch()
});
</script>

<template>

    <h2 class="container text-3xl px-25 py-15">My Orders</h2>

    <div class="grid-container">
    <!--   Database Content  -->


    <div class="container border rounded-2xl mb-20 ml-25 w-280" v-for="order in orders" :key="order.id">
        <h3 class="text-2xl bg-gray-300 p-6 rounded-t-2xl">Order ID: {{order.orderId}}</h3>
        <div class="flex flex-col mt-10 w-250 border-b-2">
        <div v-for="product in order.products" class="cartproduct flex py-4 border-b-2 border-gray-200 mt-5">
        <div class="">
            <img class="max-w-60" :src="`data:${product.imageType};base64,${product.imageData}`" alt="">
        </div>
        <div class="desc text-xl px-15 max-w-200">
            
            <div class="flex flex-col items-center space-x-2">
                <p>{{ product.name }} </p>
                {{ product.description }}
            </div>
        </div>
        <div class="text-2xl py-4 items-center">
            ${{product.price}}
        </div>
    </div>
    </div>
    </div>
    
    </div>    
</template>


<!---

<h1>{{product.name}}</h1>
        <p>{{product.description}}</p>
        <div class="cartPrice">
            <div class="price"> ${{product.price}} </div>
        </div>

-->