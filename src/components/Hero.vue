<script setup>
import { HOST_URL } from '../config';

</script>

<template>
        <div class="container relative mx-auto px-6 my-8">
        <div class="bg-amber-50 rounded-xl flex items-center justify-between overflow-hidden :sm-flex-col">
            <div class="p-12 max-w-lg">
                <h1 class="text-4xl font-semibold text-green-900 mb-6">
                Grab upto 15% Off On<br>
                Selected Headphones  
                </h1>
                <button class="bg-green-900 text-white px-6 py-2 rounded-full">
                    Buy Now
                </button>
            </div>

            
            <div class="flex-1 h-96 relative">
                <img
                    src="../assets/images/headphone.png"
                    alt="Headphones promotion"
                    class="absolute right-0 h-full object-cover"
                >
            </div>
        </div>

        <div class="container flex-col mx-auto p-4 mb-10">    
        
        
        <h1 class="text-3xl">Top-Selling Product of <br> the year Collection</h1>
        <div class="top container grid grid-cols-4 gap-2 mx-auto mt-10">
            <div class="clothing cursor-pointer">
                <img class="w-80 h-80 mx-4 border border-gray-200 rounded-2xl" src="../assets/images/clothing.jpg">
                <h2 class="text-2xl mt-2 text-center">Clothing</h2>
            </div>
            <div class="kids cursor-pointer">
                <img class="w-80 h-80 mx-4 border border-gray-200 rounded-2xl" src="../assets/images/kids.jpg">
                <h2 class="text-2xl mt-2 text-center">Kids</h2>
            </div>
            <div class="electronics cursor-pointer">
                <img class="w-80 h-80 mx-4 border border-gray-200 rounded-2xl" src="../assets/images/laptop.jpg">
                <h2 class="text-2xl mt-2 text-center">Electronics</h2>
            </div>
            <div class="accessories cursor-pointer">
                <img class="w-80 h-80 mx-4 border border-gray-200 rounded-2xl" src="../assets/images/pexels-pixabay-277390.jpg">
                <h2 class="text-2xl mt-2 text-center">Accessories</h2>
            </div>
        </div>
       </div>
    </div>
</template>

<style scoped>


</style>
