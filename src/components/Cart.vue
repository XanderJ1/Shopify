<script setup>

import {onMounted, ref, computed, watch} from 'vue';
import axios from 'axios'
import { HOST_URL } from '../config';

function setupAxiosAuth() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const products = ref([])
const paymentUrl = ref('')
const showPaymentUrl = ref(false)


//Fetch product
function fetch(){
    setupAxiosAuth();
    axios.get(`${HOST_URL}api/v1/users/cart`)
    .then((response) => {       
        console.log(response.data)
        products.value = response.data
        console.log("Test:" + products.value);
        console.log(products.value[0].name);
        
    })
}

//Total price
const totalPrice = computed(() => {
    let total = 0;
    products.value.forEach(product => {
        total += parseFloat(product.price)
    });
    return total.toFixed(2);
})

function pay(){
    const orderedProducts = products.value.map(product => product.id)
    setupAxiosAuth();
    axios.post(`${HOST_URL}api/v1/order`, orderedProducts)
    .then((response) => {
        paymentUrl.value = response.data;
        showPaymentUrl.value = true;
    });
}

function removeFromCart(productId){
    setupAxiosAuth();
    axios.post(`${HOST_URL}api/v1/products/removeFromCart/${productId}`)
    .then((response) => {
        console.log(response.data);
        alert('Item removed')
    })
    .catch((error) => {
        console.error('Error placing order:', error);
        alert('Could not remove product');
    });
}
onMounted(
    () => fetch()
)
</script>

<template>
    <h2 class="ml-18 text-3xl font-semibold">Cart </h2>

    <div class="content flex ml-15 mt-10">
        <div class="row flex flex-col min-w-8/12 mr-8">
            <div class="sum border border-gray-200 rounded px-5">
                <h3 class="text-xl text-gray-800 font-bold mb-5 mt-6">
                    <i class="pi pi-shopping-cart text-green-500 pr-2"></i>Order Summary
                </h3>
                <div class="orders grid grid-cols-5 border-b border-gray-200">
                    <p class="text-sm text-gray-500 pl-3 col-span-3">Name</p>
                    <p class="text-gray-500 ">Price</p>
                    <p class="text-gray-500 ">Quantity</p>
                </div>
                <div v-for="product in products" class="orders grid grid-cols-5">
                    <div class="prod flex col-span-3">
                        <img class="w-35 p-4 rounded" :src="`data:${product.imageType};base64,${product.imageData}`" alt="">
                        <li class="flex flex-col list-none justify-center">
                            <h3 class="flex">{{product.name}}</h3>
                            <p class="text-sm text-gray-400">Size: <select class="border border-gray-500 rounded px-1"> <option>50 ml</option></select> </p>
                        </li>
                    </div>
                    <div class="price flex items-center"> ${{ product.price }}</div>
                    <div class="quantity flex items-center">
                        <i @click="removeFromCart(product.id)" class="pi pi-minus pr-3"></i>
                        <input class="w-10 rounded text-center border border-gray-300" type="text" :value="1">
                    <i class="pi pi-plus pl-3"></i>
                    </div>
                </div>
            </div>
            
            <div class="delivery border border-gray-300 rounded-xl mt-6 p-6">
                <h3 class="text-2xl font-extrabold mt-4">
                    <i class="pi pi-truck text-indigo-400 pr-2"></i>Delivery Options
                </h3>
                <div class="flex gap-10 mt-5">
                    <div class="instant flex flex-col border-3 border-indigo-500 rounded-xl p-8">
                    <h4 class="text-xl font-bold mb-5">Instant Delivery <i class="pi pi-check text-white bg-indigo-500 border p-1 rounded-2xl"></i></h4>
                    <h3 class="text-2xl font-bold text-indigo-500">$22</h3>
                    <p class="text-sm text-gray-500">Expedited delivery</p>
                    <div class="text-sm text-gray-500">Est. arrival: Today</div>
                    </div>
                    <div class="standard flex flex-col border-3 border-indigo-500 rounded-xl p-8">
                    <h4 class="text-xl font-bold mb-5">Standard Delivery <i class="pi pi-check"></i></h4>
                    <h3 class="text-2xl font-bold text-indigo-500">$22</h3>
                    <p class="text-sm text-gray-500">Standard delivery</p>
                    <div class="text-sm text-gray-500">Est. arrival: 3-5 Business days</div>
                    </div>
                </div>
            </div>

            <div class="info">
                <h3 class="font-extrabold mt-4">Customer Information</h3>
            </div>
        </div>
        <div class="col flex flex-col min-w-3/12">
            <div class="pay_method p-5 border border-gray-200 min-w-full rounded-xl">
                <h3 class="font-bold text-xl">
                    <i class="pi pi-credit-card text-indigo-400 pr-2"></i>Payment Method
                </h3>
                <p class="text-sm mt-4 text-indigo-400">Change payment method</p>
                <div class="pay_type flex items-center">
                    <img class="w-20" src="@/assets/images/visa.png" alt="visacard">
                    <p class="text-sm font-bold">Mastercard</p>
                    <p class="flex pl-5">*******2347</p>
                </div>
                <div class="voucher mb-5">
                    <h3 class="font-bold mt-3 mb-2"><i class="pi pi-ticket text-indigo-600 pr-2"></i>Voucher</h3>
                    <input class="border border-gray-400 rounded p-1 mr-3" type="text" placeholder="Enter voucher code">
                    <button class="text-white border border-indigo-500 p-1 rounded bg-indigo-500">Apply</button>
                </div>
            </div>
            <div class="order_sum mb-120 border border-gray-300 mt-5 rounded-xl p-8">
                <h3 class="text-xl font-bold mb-4">
                    <i class="pi pi-list pr-2 pt-2 text-indigo-400"></i>Order Summary</h3>
                <div class="flex flex-col border-b  border-gray-300 gap-5">
                    <div class="subtotal flex justify-between">
                    <p class="text-gray-400">Subtotal</p>
                    <p class="amount">{{totalPrice}}</p>
                </div>
                <div class="discount flex justify-between">
                    <p class="text-gray-400">Discount</p>
                    <p class="amount text-red-500">${{ 15 }}</p>
                </div>
                <div class="delivery_fee flex justify-between mb-3">
                    <p class="text-gray-400">Shipping</p>
                    <p class="amount"> ${{ 10 }}</p>
                </div>
                </div>

                <div class="total flex justify-between mt-5">
                    <h3 class="text-xl font-bold">Total: </h3>
                    <h3 class="text-2xl font-bold text-indigo-500">{{ totalPrice - 15 + 10 }}</h3>
                </div>
                <button @click="pay()" class="text-white    text-xl border w-full border-indigo-500 bg-indigo-500 rounded p-2 mt-3">
                    Proceed to Payment
                </button>
                <div v-if="showPaymentUrl">
                    <h2 id="payment" class="text-xl text-center text-green-500">
                    <a target="_blank" :href="paymentUrl">Pay</a>
                </h2>
                </div>
                


            </div>
        </div>
    </div>
</template>