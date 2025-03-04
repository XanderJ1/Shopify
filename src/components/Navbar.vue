<script setup>
import { RouterLink } from 'vue-router';


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
            <a href="#">Contact</a>
            <RouterLink to="/addProduct">Add Product  </RouterLink>
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