<script setup>
import {ref, defineProps, onMounted} from 'vue'
import axios from 'axios'
import { HOST_URL } from '../config';
import { useCounter } from '@/stores/counter'


const storeCounter = useCounter()
const product = ref({})
const props = defineProps({
   id:{
    type: Number,
    default: 2   
   }
})

function buyIt(productId) {
    axios.post(`${HOST_URL}api/v1/products/buy`)
    .then((response) => {
        alert(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
}

const id = props.id
function get(){
    const token =  localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get(`${HOST_URL}api/v1/products/${id}`)
    .then(response => {
        console.log(response.data)
        product.value=response.data
    })
}



function addToCart(id){
    axios.post(`${HOST_URL}api/v1/products/addToCart/${id}`)
    .then((response) => {
        alert(response.data)
        storeCounter.increment()
    })
    .catch((error) => {
        console.log(error)
    })
}


onMounted(() => {
    get()
})

</script>

<template>
        <main>
        <div class="row">
            <div class="column1">
                <div class="up">
                    <!-- <div class="img-cont" :product> -->
                    <img :src="`data:${product.imageType};base64,${product.imageData}`" alt="">
                    <!-- </div> -->
                </div>
                <div class="down">
                    <img src="../assets/images/airmax.png" alt="">
                    <img src="../assets/images/AirPods Max Headphones Green.H02.watermarked.2k.png" alt="">
                    <img src="../assets/images/airpod.png" alt="">
                    <img src="../assets/images/AirPods Max Headphones Silver.G03.watermarked.2k.png">
                </div>
            </div>
        <div class="column">
            <div class="message">
            <h1>Airpods- Max</h1>
            <p>Original Classic, IPX8 certified 2024 edition</p>
            <div class="stars"><i class="pi pi-star-fill text-orange-500"></i><i class="pi pi-star-fill text-orange-500"></i><i class="pi pi-star-fill text-orange-500"></i><i class="pi pi-star-fill text-orange-500"></i><i class="pi pi-star-fill text-orange-500"></i></div>
            <div class="discount">
                <h3>Pay $350.00 or $20.00/month</h3>
                <p>You can pay just 20 dollars per month for the product</p>
            </div>
            <div class="coon">
                <h4>Color</h4>
            <div class="colours">
                <p>Red</p>
                <p>Green</p>
                <p>Blue</p>
            </div>
            </div>
        </div>  
        <div class="add flex bg-gray-300 rounded-2xl w-30 h-8 items-center p-2 justify-around">
            <i class="pi pi-minus text-xl"></i>
            <h3 class="p-10 text-xl">1</h3>
            <i class="pi pi-plus text-xl"></i>
        </div>  
        <div class="buttons" :product>
            <button class="buy" @click="buyIt(6)">Buy Now</button>
            <button @click="addToCart(product.id)" class="cart cursor-pointer"> Add to Cart</button>
        </div>        
    </div>
    </div>
    </main>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', serif;
   
}
main{
    margin: 10px 60px;
    padding: 30px;
    margin-bottom: 160px;
}
.row{
    display: flex;

}
.column{
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    margin-left: 2rem;
}
.column1{
    display: flex;
    margin-right: 2rem;
    flex-basis: 50%;
    flex-direction: column;
    max-width: 100rem;
    height: 20rem;
}
.column1 .up{
    display: flex;
    padding: 10px;
    margin: 10px;
    justify-content: center;
    background-color: rgb(239, 233, 233);
}
.column1 .up .img-cont{
    display: flex;
}
.column1 .up img{
    width: 20rem;
    height: 25rem;
}
.column1 .down{
    display: flex;
    min-height: 30rem;
}
.column1 .down img{
    flex-basis: 25%;
    width: 8rem;
    height: 10rem;
}
.column .message{
    display: flex;
    flex-direction: column;
}
.message h1{
    margin-top: 5px;
}
.message p{
    margin: 10px 0px 10px 0px;
    color: gray;
}
.message .discount{
    margin: 45px 0px 25px 0px;
}
.column .coon{
    display: flex;
    flex-direction: column;
}
.column .colours{
    display: flex;
    justify-content: space-between;
    width: 50px;
}
.column .colours p{
    margin-right: 10px;
}
.column .colours .color{
    border: 1px solid brown;
    border-radius: 80%;
    background-color: brown;
    padding: 20px 20px;
    margin: 10px;
}
.column .colours .color1{
    border: 1px solid coral;
    border-radius: 80%;
    background-color: coral;
    padding: 10px 20px;
    margin: 10px;
}
.column .colours .color2{
    border: 1px solid rgb(21, 35, 97);
    border-radius: 80%;
    background-color: rgb(21, 35, 97);
    padding: 20px 20px;
    margin: 10px;
}
.buttons{
    margin: 4rem 0px 2rem 0px;
}
.buy{
    border: 1px solid green;
    background-color: green;
    padding: 10px;
    border-radius: 20px;
    color: white;
    padding-left: 20px;
    padding-right: 20px;
    
}
h3{
    padding-left: 3px;
    padding-right: 3px;
}
.cart{
    border: 1px solid black;
    border-radius: 20px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 10px;
}
</style>