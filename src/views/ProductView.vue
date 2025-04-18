<script setup>
import Product from '@/components/Product.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const productId = route.query.id
console.log("Product", productId)
</script>

<template>
    <Product :id= productId />
</template>