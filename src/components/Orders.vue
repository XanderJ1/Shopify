<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';

// Make products reactive
const products = ref([]);



function fetch(){
    console.log('Hello');

    const token =  localStorage.getItem('token');
    const user = localStorage.getItem('role');
    axios.defaults. headers. common ['Authorization'] = `Bearer ${token}`;
    let url = 'http://localhost:8080/api/v1/products/orders';

    if(user === 'BUYER'){
        url = 'http://localhost:8080/api/v1/products/buyerOrders';
    }else{   
        url = 'http://localhost:8080/api/v1/products/sellerOrders';
    }
    axios.get(url)
    .then((response) => {
        products.value = response.data;
        console.log(response.data);
        console.log(products.length);
        console.log(products);
    })
    .catch((error) => {
        console.log(error);
    });    
}

onMounted(() => fetch());

</script>

<template>

    <h2 class="container text-3xl px-25 py-15">My Orders</h2>

    <div class="grid-container">
    <!--   Database Content  -->
    <div class="firstProduct" v-for="product in products" :key="product.id">
        <RouterLink :to="{
        path: '/product',
        query: {id: product.id}
        }">
        <div class="img-cont">
        <img :src="`data:${product.imageType};base64,${product.imageData}`" alt="">
        </div>
        <h1>{{product.name}}</h1>
        <p>{{product.description}}</p>
        <div class="stars">★★★★★</div>
        <div class="cartPrice">
            <div class="cart">Add to cart</div>
            <div class="price"> ${{product.price}} </div>
        </div>
        </RouterLink>
    </div>     
    </div>    
</template>