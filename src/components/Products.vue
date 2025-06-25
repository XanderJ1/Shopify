<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { HOST_URL } from '../config';
import { useCounter } from '@/stores/counter';


const storeCounter = useCounter()

const products = ref([]);
function addToCart(id){
    console.log(id)
    axios.post(`${HOST_URL}api/v1/products/addToCart/${id}`)
    .then((response) => {
        console.log(response.data)
        storeCounter.increment()
    })
    .catch((error) => {
        console.log(error)
    })
}


function fetch(){
    console.log('Hello');

    const token =  localStorage.getItem('token');
    // axios.defaults. headers. common ['Authorization'] = `Bearer ${token}`;
    axios.get(`${HOST_URL}api/v1/products`)
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
    <div class="flex-col mx-8 p-4 mb-20">
        <h1 class="text-center text-3xl" @click="getIt()"> Featured Products </h1>
    <div class="grid grid-cols-4 gap-3">
    <!--   Database Content  -->
    <div class="firstProduct border border-gray-200 mt-5 rounded-xl" v-for="product in products" :key="product.id">
        <RouterLink :to="{
        path: '/product',
        query: {id: product.id}
        }">
        <div class="img-cont flex justify-center rounded-t-xl items-center bg-red-100">
        <img class="h-40 w-50 " :src="`data:${product.imageType};base64,${product.imageData}`" alt="">
        </div>
        <h1 class="mx-3 text-xl mt-2">{{product.name}}</h1>
        <!-- <p>{{product.description}}</p> -->
        <div class="stars mx-3"><i class="pi pi-star-fill text-orange-500"></i><i class="pi pi-star-fill text-orange-500"></i><i class="pi pi-star-fill text-orange-500"></i><i class="pi pi-star-fill text-orange-500"></i><i class="pi pi-star-fill text-orange-500"></i></div>
        </RouterLink>
        <div class="cartPrice m-3 flex justify-between items-center">
            <div @click="addToCart(product.id)" class="cart border border-gray-400 rounded-2xl p-1 transition duration-200 ease-out hover:scale-110 cursor-pointer border-gray-900">Add to cart </div> 
            <div class="price text-gray-900 text-xl font-bold"> ${{product.price}} </div>
        </div>
    </div>     
</div>
    </div>

        <!--   Promotions  -->
    <h2 class="text-3xl text-center">Limited Time Deals</h2>
    <div class="ads flex gap-4 m-8 justify-center">
        <div class="prod1 w-100 border border-gray-300 rounded-xl p-2 flex">
            <img class="w-30 h-30 mt-4 mr-5 rounded cursor-pointer" src="../assets/images/track.png" alt="">
            <div class="words flex flex-col">
            <p class="text-red-400">Ends in: 02h 17m 58s</p>
            <h3 class="font-bold mb-2"> New Air jordans</h3>
            <div class="pricing flex mb-2">  
                <h2 class="price text-xl font-bold text-blue-500 pr-4">$45</h2> 
                <del class="discount font-bold text-gray-500">$80</del>
            </div> 
           <div class="btn flex font-medium text-white rounded-xl bg-orange-400">Shop Now <i class="pi pi-arrow-right "></i></div>
           </div>
        </div>

        <div class="prod1 w-100 border border-gray-300 rounded-xl p-2 flex">
            <img class="w-30 h-20 min-h-full pt-4 mr-5 cursor-pointer" src="../assets/images/apple/homepod.png" alt="">
            <div class="words flex flex-col">
            <p class="text-red-400">Ends in: 01h 14m 58s</p>
            <h3 class="font-bold mb-2"> Apple home pods</h3>
            <div class="pricing flex mb-2">  
                <h2 class="price text-xl font-bold text-blue-500 pr-4">$390.99</h2> 
                <del class="discount font-bold text-gray-500">$500</del>
            </div> 
           <div class="btn flex font-medium text-white rounded-xl bg-orange-400">Shop Now <i class="pi pi-arrow-right "></i></div>
           </div>
        </div>
        <div class="prod1 w-100 border border-gray-300 rounded-xl p-2 flex">
            <img class="w-30 h-30 pt-4 mr-5 cursor-pointer" src="../assets/images/vision_pro.png" alt="">
            <div class="words flex flex-col">
            <p class="text-red-400">Ends in: 04h 42m 58s</p>
            <h3 class="font-bold"> New Air jordans</h3>
            <div class="pricing flex">  
                <h2 class="price text-xl font-bold text-blue-500 pr-4">$45</h2> 
                <del class="discount font-bold text-gray-500">$80</del>
            </div> 
           <div class="btn flex font-medium text-white rounded-xl bg-orange-400">Shop Now <i class="pi pi-arrow-right "></i></div>
           </div>
        </div>
    </div>
    
    
    <div class=" text-gray-900 text-center font-semibold mt-20 mb-2">Get alerts on the latest deals</div>
    <div class="flex justify-center mb-10">        
        <div class="input flex items-center h-10 pl-4 border border-gray-300 rounded-xl mr-3">
            <span class="pi pi-envelope text-gray-400 pr-3"></span><input class="" type="text" name="email" placeholder="Your email address">
        </div>
        <div class="text-white bg-indigo-500 p-2 rounded-xl"> Subscribe </div>
    </div>
    
</template>

<style scoped>
        /* .firstProduct img{
            height: 200px;
            width: 200px;
            min-width: 230px;
        } */
</style>