<script setup>
import { HOST_URL } from '../config';

</script>

<template>

<!-- <footer class="footer footer-horizontal bg-black text-white p-10">
  <nav>
    <h6 class="footer-title">Services</h6>
    <a class="link link-hover">Branding</a>
    <a class="link link-hover">Design</a>
    <a class="link link-hover">Marketing</a>
    <a class="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 class="footer-title">Company</h6>
    <a class="link link-hover">About us</a>
    <a class="link link-hover">Contact</a>
    <a class="link link-hover">Jobs</a>
    <a class="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 class="footer-title">Legal</h6>
    <a class="link link-hover">Terms of use</a>
    <a class="link link-hover">Privacy policy</a>
    <a class="link link-hover">Cookie policy</a>
  </nav>
</footer> -->

<div class="container mx-auto text-gray-500 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-600 mb-10">
        <div class="grid ml-25">
            <ul class="space-y-2">
                <li class="text-gray-700 font-bold">Company</li>
                <li><span class="pi pi-info-circle"></span> About</li>
                <li><span class="pi pi-briefcase"></span> Careers</li>
                <li class="text-l"><span class="pi pi-phone"></span> 0610353967</li>
            </ul>
        </div>
        <div class="grid">
            <ul class="space-y-2">
                <li class="text-gray-700 font-bold">Features</li>                
                <li>Student Services</li>
                <li>Employer Solutions</li>
                <li>Pricing</li>
            </ul>
        </div>
        <div class="grid">
            <ul class="space-y-2">
                <li class="text-gray-700 font-bold">Resources</li>
                <li>Blog</li>
                <li>Help Center</li>
                <li>Terms of Service</li>
            </ul>
        </div>
        <div class="">
            <ul class="space-y-2">
                <li class="text-gray-700 font-bold">Follow Us</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>LinkedIn</li>
            </ul>
        </div>
</div>
</template>

<style scoped>

</style>