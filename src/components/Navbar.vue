<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { HOST_URL } from '../config';
import axios from 'axios';
import { useCounter} from '@/stores/counter'

const storeCounter = useCounter()

const isEmpty = ref()
const cartSize = ref(0);
const products = ref([])
const role =  ref(localStorage.getItem('role'));

function dropdown(){
    console.log('Dropdown');
    
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('hidden');
}

function logout(){
    localStorage.setItem('token',"");
    localStorage.setItem('role', "");
    localStorage.setItem('initials', "");
}

function search(searchQuery){

    const token =  localStorage.getItem('token');
    axios.defaults. headers. common ['Authorization'] = `Bearer ${token}`;
    axios.get(`${HOST_URL}api/v1/products/search?name=${searchQuery}`)
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

function getCart(){
    const token =  localStorage.getItem('token');
    axios.defaults. headers. common ['Authorization'] = `Bearer ${token}`;
    axios.get(`${HOST_URL}api/v1/order/cartSize`)
    .then((response) => {
        console.log(response.data);
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
            <img class="w-20 h-20 ml-38" src="https://github.com/XanderJ1/images/raw/25f3d1e48bd80d96668641c82f71afa5dcb88ff5/logo1.png" alt="">
        </div>
        
        <div class="flex items-center text-xl   space-x-8">
            <a href="#">Categories</a>
            <a href="#">Deals </a>
            <a @click="getCart()" href="#">What's New </a>
            <div v-if="role === 'SELLER'">
                <RouterLink to="/addProduct">Add Product</RouterLink>
            </div>
            
            <div v-if="role !== 'SELLER'">
            <div class="search">
                <label class="input rounded-3xl w-100">
                <input v-model="searchQuery" type="search" required placeholder="Search" @keydown.enter="search(searchQuery)">
                <i @click="search(searchQuery)" class="pi pi-search cursor-pointer"></i>
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
        </div>
        <div class="flex items-center text-xl space-x-6">
            <!-- Cart or My Products  --->
            <div class="flex items-center text-xl space-x-2">
            <div v-if="role == 'BUYER'">
            <div class="flex space-x-2">
            <img src="../assets/images/shopping-cart.svg" class="w-5 h-5" alt="">
            <span><RouterLink to="/cart">Cart {{ storeCounter.count }}</RouterLink> </span>
            </div>
            
            </div>
            <div v-else-if="role == 'SELLER'">
            <span><RouterLink to="/myProducts">My Products</RouterLink> </span>
            </div>
            </div>

            <div v-if="role == 'SELLER' || role == 'BUYER'">
                <div class="flex items-center space-x-2">
            <img src="../assets/images/cube-solid.svg" class="w-5 h-5" alt="">   
            <span><RouterLink to="/orders">Orders</RouterLink></span>
            </div>
            </div>

            <div class="flex items-center space-x-2">

            <!-- SignUp or Initials     --->

            <div v-if="role === 'SELLER' || role === 'BUYER'">
                <div class="flex flex-col">
                <div class="flex space-x-2">
                <span @click="dropdown()"><img class="h- w-8 p-1 border rounded-2xl" src="../assets/images/user-solid.svg"></span>
                <img src="../assets/images/caret-down-solid.svg" class="w-5 h-5" alt="">
                </div>
                </div>
                <div @mouseleave="dropdown()" class="dropdown hidden absolute bg-white border border-gray-300 w-32 z-1">
                    <ul>
                        <li><RouterLink to="/profile">Profile</RouterLink></li>
                        <li><RouterLink to="/orders">Orders</RouterLink></li>
                        <li @click="logout()">
                            <RouterLink to="/">
                            <div class="flex items-center space-x-2">
                                <span class="text-red-500"> Logout </span>
                                <img src="../assets/images/logout.svg" class="w-5 h-5" alt="">
                            </div>
                        </RouterLink></li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <div class="flex items-center space-x-2v p-2 bg-orange-400 border border-orange-400 rounded-2xl">
                <span class=" text-white"><RouterLink to="/login"> Log In </RouterLink></span> 
                  <div class="w-px h-8 bg-white mx-2"></div>
                <span class="text-white"><RouterLink to="/signup"> SignUp  </RouterLink></span>
                
                </div>
            </div>
            </div>
            
        </div>
    </div>
</div>
</template>

<style scoped>
</style>