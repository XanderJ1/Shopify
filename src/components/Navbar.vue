<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';

const isEmpty = ref()
const products = ref([])
let role =  ref()
let initials = ref()

    role.value =  localStorage.getItem('role');
    initials.value = localStorage.getItem('initials');

function dropdown(){
    console.log('Dropdown');
    const list = ['Profile', 'Orders', 'Logout'];
    
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
            <div v-if="role === 'SELLER'">
                <RouterLink to="/addProduct">Add Product  </RouterLink>
            </div>
            
            <div v-if="role !== 'SELLER'">
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
        </div>
        <div class="flex items-center text-xl space-x-6">
            <!-- Cart or My Products  --->
            <div class="flex items-center text-xl space-x-2">
            <div v-if="role == 'BUYER'">
            <div class="flex space-x-2">
                <img src="../assets/images/shopping-cart.svg" class="w-5 h-5" alt="">
            <span><RouterLink to="/cart">Cart</RouterLink> </span>
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
                <span @click="dropdown()" class="bg-blue-500 text-white rounded-full p-2">{{initials}}</span>
                <img src="../assets/images/caret-down-solid.svg" class="w-5 h-5" alt="">
                </div>
                </div>
                <div class="dropdown hidden absolute bg-white border border-gray-300 w-32 z-1">
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
                <div class="flex items-center space-x-2">
                    <img src="../assets/images/user.svg" class="w-5 h-5" alt="">
                <span><RouterLink to="/login"> Log In </RouterLink></span>  <span>/ </span>  
                <span><RouterLink to="/signup"> SignUp  </RouterLink></span>
                </div>
            </div>
            </div>
            
        </div>
    </div>
</div>
</template>

<style scoped>
</style>