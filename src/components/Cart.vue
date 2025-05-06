<script setup>

import { onMounted, ref, computed, watch } from 'vue';
import axios from 'axios';
import { HOST_URL } from '../config';


const url = ref('');

const products = ref([]);

function fetch(){
    
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.get(`${HOST_URL}api/v1/users/cart`)
.then((response) => {
    console.log(response.data)
    products.value = response.data
})
}   

const totalPrice = computed(() => {
  let total = 0;
  products.value.forEach(product => {
    total += parseFloat(product.price);
  });
  return total.toFixed(2);
});

const orderedProducts = computed(() => {
    return products.value.map(product => product.id);
});

function pay(){
    const paymentLink = document.querySelector('#payment');
    paymentLink.classList.remove('hidden');
}

function buyNow(){

    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.post(`${HOST_URL}api/v1/order/order/`, orderedProducts.value)
    .then((response) => {
        console.log(response.data);
        url.value = response.data;
        alert('Order placed successfully!');
        console.log(totalPrice.value);
    })
    .catch((error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
    });
    console.log(totalPrice.value);
    pay();
}

function remove(productId){
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.post(`${HOST_URL}api/v1/products/removeFromCart/${productId}`, orderedProducts.value)
    .then((response) => {
        console.log(response.data);
        alert('Order placed successfully!');
    })
    .catch((error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
    });
}

onMounted(
    () => fetch()
)

watch(orderedProducts, (newValue) => {
    console.log('Ordered Products:', newValue);
});
</script>

<template>
    <h1 class="text-left text-3xl px-25 pt-10">Cart</h1>

    <!----    Database Cart     ---->
    <div  class="flex mb-20">
        <div  class="flex flex-col ml-25 mt-10 w-250">
        <div v-for="product in products" class="cartproduct flex py-4 border rounded-2xl mt-5">
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
                <button @click="remove(product.id)" class="bg-gray-200 px-2">-</button>
                <input type="text" class="w-10 text-center" value="1">
                <button class="bg-gray-200 px-2">+</button>

            </div>
        </div>
        <div class="text-2xl py-4 items-center">
            ${{product.price}}
        </div>
    </div>
    </div>
    <div class="bg-white min-w-100 px-10 text-center text-2xl mt-10">
    <h2 class="text-2xl">Payment Method</h2>
    <div class="flex items-center justify-center space-x-2 py-4">
        <img class="w-10 h-10" src="../assets/images/account.svg" alt="Visa">
        <img class="w-10 h-10" src="../assets/images/airpod.png" alt="MasterCard">
        <img class="w-10 h-10" src="../assets/images/avatar-shanai.png" alt="PayPal">
    </div>

    <div class="py-4 text-left pl-15" >
        <p>Subtotal: ${{totalPrice}}</p>
        <p>Shipping: $0.00</p>
        <p>Total: ${{totalPrice}}</p>
    </div>
    <h3 @click='buyNow()' class="rounded-full bg-green-500 w-50 p-3 ml-15">Buy Now</h3>
    <div id="payment" :class="hidden">
        <h2 class="text-xl mt-8 mb-3"> Proceed to Payment</h2>
        <a v-if="url" :href="url" target="_blank" class="text-white bg-green-600 mt-10 p-2 border rounded-2xl">
                Complete your payment
            </a>
    </div>
    </div>
    </div>
    
</template>

<style scoped>
/* In your CSS file, if needed */
.fill-orange-500 {
  fill: #f97316;
}
</style>