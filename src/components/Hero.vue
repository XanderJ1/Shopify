<script setup>
import { onMounted, ref } from 'vue'
import { HOST_URL } from '../config'

const currentSlide = ref(0)
const totalSlides = 2  // You have 2 slides currently
const slidesRef = ref(null)

function updateSlide() {
  if (slidesRef.value) {
    slidesRef.value.style.transform = `translateX(-${currentSlide.value * 100}%)`
  }
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % totalSlides
  updateSlide()
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
  updateSlide()
}

onMounted(() => {
  setInterval(nextSlide, 4000)
})
</script>

<template>
        <div class="relative mx-auto px-6 my-8">

        <div class="categories flex justify-center gap-5 bg-gray-100 p-10">
            <div class="airpods">
                <div class="img w-30">
                    <img src="../assets/images/apple/mac.png" alt="">
                    <h3 class="text-center">Electronics</h3>
                </div>
            </div>
            <div class="airpods">
                <div class="img w-30">
                    <img src="../assets/images/apple/iphone.png" alt="">
                    <h3 class="text-center">Phones</h3>
                </div>
            </div>
            <div class="airpods flex flex-col">
                <div class="img w-30 h-30 ">
                    <img class="w-20 h-20" src="../assets/images/clothing.jpg" alt="">
                    <h3 class="pl-4">Fashion</h3>
                </div>
            </div>
            <div class="watch flex flex-col">
                <div class="img">
                    <img class="w-20 h-20 border border-white rounded-l" src="../assets/images/groceries.jpg" alt="">
                    <h3>Groceries</h3>
                </div>
            </div>
            <div class="airpods">
                <div class="img w-30">
                    <img src="../assets/images/apple/vision_pro.png" alt="">
                    <h3 class="text-center">Vision Pro</h3>
                </div>
            </div>
            <div class="airpods">
                <div class="img w-30">
                    <img src="../assets/images/apple/tv.png" alt="">
                     <h3 class="text-center">Apple Tv</h3>
                </div>
            </div>
            <div class="airpods">
                <div class="img w-30">
                    <img class="w-25 h-20 mx-2 rounded-l" src="../assets/images/beauty.jpg" alt="">
                     <h3 class="text-center">Beauty</h3>
                </div>
            </div>
            <div class="airpods">
                <div class="img w-30">
                    <img src="../assets/images/apple/tv.png" alt="">
                     <h3 class="text-center">Apple Tv</h3>
                </div>
            </div>
            <div class="airpods">
                <div class="img w-30">
                    <img src="../assets/images/apple/homepod.png" alt="">
                    <h3 class="text-center">Homepod</h3>
                </div>
            </div>
        </div>


        
        <div class="container flex-col mx-auto p-4 mb-10">    
        
        <!-- Simple Promotions Slideshow -->
        <div class="relative">
            
            <!-- Slider Container -->
            <div class="slider rounded-xl overflow-hidden">
            <div ref="slidesRef" class="flex transition-transform duration-700 ease-out w-500">
            <div class="bg-amber-50 rounded-xl flex items-center justify-between min-w-full">
            <div class="p-12 max-w-lg">
                <h1 class="text-4xl font-semibold text-green-900 mb-6">
                Grab upto 15% Off On<br>
                Selected Headphones
                </h1>
                <button class="bg-green-900 text-white px-6 py-2 rounded-full">
                    Buy Now <i class="pi pi-arrow-right pl-1"></i>
                </button>
            </div>

            
            <div class="flex-1 h-96 relative">
                <img
                    src="../assets/images/headphone.png"
                    alt="Headphones promotion"
                    class="h-full object-contain mx-auto"
                >
            </div>
        </div>

            <div class="bg-pink-100 rounded-xl flex items-center justify-around min-w-full">
            <div class="p-12 max-w-lg">
                <h1 class="text-4xl font-semibold text-green-900 mb-6">
                New Airforce<br>
                Pre order at 25% off
                </h1>
                <button class="bg-pink-800 text-white px-6 py-2 rounded-full">
                    Buy Now <i class="pi pi-arrow-right pl-1"></i>
                </button>
            </div>

            
            <div class="flex-1 h-96 relative">
                <img
                    src="../assets/images/kick.png"
                    alt="Headphones promotion"
                    class="h-full object-contain mx-auto"
                >
            </div>
        </div>

                </div>
            </div>
        <button @click="prevSlide()" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full nav-btn">
        ‹
        </button>
        <button @click="nextSlide()" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full nav-btn">
        ›
        </button>
        </div>
        
        <h1 class="text-3xl mt-15">Top-Selling Products</h1>
        <div class="top container grid grid-cols-4 gap-2 mx-auto mt-2">
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
