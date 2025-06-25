<script setup>
import { onMounted, ref } from 'vue';
import { HOST_URL } from '../config';

import axios from 'axios';
console.log('Hello');

const products = ref([]);

function setupAxiosAuth() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function fetch(){
setupAxiosAuth();
axios.get(`${HOST_URL}api/v1/users/products`)
.then((response) => {
    console.log(response.data)
    products.value = response.data
})
}

function removeMyProduct(productId){
    setupAxiosAuth();
    console.log(productId);
    
    axios.delete(`${HOST_URL}api/v1/products/removeProduct/${productId}`)
    .then((response) => {
        console.log(response.data);
        alert(response.data)
    })
    .catch((error) => {
        console.error('Error placing order:', error);
        alert('Could not remove product');
    });
}

onMounted(() => fetch())

</script>

<template>

    <h3 class="text-3xl text-gray-800 font-bold px-20 pt-10 mb-10">
        <i class="pi pi-shopping-cart text-green-500 pr-2"></i>My Products
    </h3>
    <div class="sum border border-gray-3n00 mx-20 rounded px-5 mb-10">
                <div class="orders grid grid-cols-5 border-b border-gray-200 my-5">
                    <p class="text-gray-500 pl-3 col-span-1">Name</p>
                    <p class="text-gray-500 pl-3 col-span-2 ml-10">Description</p>
                    <p class="text-gray-500 ">Price</p>
                    <p class="text-gray-500 ">Remove</p>
                </div>
                <div v-for="product in products" class="orders grid grid-cols-5">
                    <div class="prod flex col-span-1">
                        <RouterLink :to="{
                        path: '/product',
                        query: {id: product.id}
                        }">                   
                        <img class="w-35 p-4 rounded" :src="`data:${product.imageType};base64,${product.imageData}`" alt="">
                        </RouterLink>
                        <li class="flex flex-col list-none justify-center">
                            <h3 class="flex">{{product.name}}</h3>
                            <p class="text-sm text-gray-400">Size: <select class="border border-gray-500 rounded px-1"> <option>50 ml</option></select> </p>
                        </li>
                    </div>
                    <div class="price flex text-left col-span-2 pl-2 items-center ml-10"> {{product.description}}</div>
                    <div class="price flex items-center"> ${{ product.price }}</div>
                    <div class="quantity flex items-center">
                        <i @click="removeMyProduct(product.id)" class="pi pi-trash text-xl text-red-500 pr-3 cursor-pointer"></i>
                    </div>
                </div>
            </div>
</template>


<style scoped>

        .grid-container{
            display: grid;
            padding: 20px;
            margin: 60px;
            grid-template-columns: repeat(auto-fit, minmax(250px,1fr));
            gap: 10px;
            justify-content: center;

        }
        .firstProduct{
            display: flex;
            flex-direction: column;
        }
        .firstProduct .img-cont{
            display: flex;
            justify-content: center;
            background-color: rgb(239, 233, 233);
        }
        .firstProduct img{
            height: 200px;
            width: 200px;
            min-width: 230px;
        }
        .firstProduct .namePrice{
            display: flex;
            width: 230px;
            padding-top: 7px;
            justify-content: space-between;
        }
        .firstProduct h1{
            font-family: Poppins;
            font-size: 20px;
        }
        .firstProduct p{
            font-size: 15px;
            color: gray;
            padding: 10px 0px 10px 0px;
        }
        .firstProduct .cartPrice{
            display: flex;
            justify-content: space-between;
        }
        .firstProduct .cart{
            border: 1px solid black;
            border-radius: 20px;
            margin-top: 10px;
            padding: 10px 6px;
            margin-bottom: 10px;
            width: 100px;
            transition: 0.3s ease-out;
        }
        .firstProduct .price{
            padding: 10px 6px;
            margin: 10px 0px;
            margin-right: 10px;
            font-size: 20px;
        }

        :hover.cart{
            transform: scale(1.15);
            cursor: pointer;
        }
</style>