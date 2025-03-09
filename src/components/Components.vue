<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';

// Make products reactive
const products = ref([]);

function fetch(){
    console.log('Hello');

    const token =  localStorage.getItem('token');
    axios.defaults. headers. common ['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:8080/api/v1/products')
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

    <h1 class="text-center text-3xl" @click="getIt()"> Featured Products </h1>
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

<style scoped>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
            margin: 70px;
            padding: 20px;
        }
        body .h1{
            text-align: center;
        }
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
            padding: 10px 3px;
            margin-bottom: 10px;
            width: 7rem;
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