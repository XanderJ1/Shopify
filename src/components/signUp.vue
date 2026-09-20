<script setup>
import { ref } from 'vue';
const submitting = ref(false);
const formError = ref('');
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
import { HOST_URL } from '../config';

const router = useRouter();

function handleSubmit() {
    if (submitting.value) return;
    submitting.value = true;
    formError.value = '';

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    const array = [username, email, password, role];


    axios.post(`${HOST_URL}auth/register`, {
        username: username,
        email: email,
        password: password,
        role: role
    })
    .then((response) => {

        router.push('/login');
    })
    .catch(() => { formError.value = 'We couldn?t create your account. Please check your details and try again.'; })
    .finally(() => { submitting.value = false; });

}
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
    <div class="grid overflow-hidden rounded-2xl border border-stone-200 lg:grid-cols-2">
      <div class="relative hidden min-h-144 flex-col overflow-hidden bg-emerald-950 p-10 text-orange-50 lg:flex disabled:opacity-60">
        <p class="text-xs uppercase tracking-widest text-orange-200">Your kind of discovery</p>
        <h2 class="relative z-10 mt-6 font-serif text-5xl leading-tight">Good finds.<br><em>Great days.</em></h2>
        <p class="relative z-10 mt-5 max-w-xs text-sm leading-relaxed text-emerald-100">A place for your next favourite. Make yourself at home.</p>
        <div class="absolute -bottom-24 right-0 h-96 w-80 rounded-t-full bg-emerald-800"></div>
        <img src="../assets/images/headphone.png" alt="" class="absolute bottom-0 right-0 h-80 w-auto object-contain">
      </div>
      <div class="p-6 sm:p-10 lg:p-12">
        <RouterLink to="/" class="inline-flex min-h-11 items-center gap-2 text-sm text-stone-500 hover:text-emerald-950"><i class="pi pi-arrow-left" aria-hidden="true"></i>Back to discovery</RouterLink>
        <h1 class="mt-5 font-serif text-4xl tracking-tight text-emerald-950">Make yourself at home.</h1>
        <p class="mt-3 text-base text-stone-500">Your next favourite is waiting to be found.</p>
        <form @submit.prevent="handleSubmit" class="mt-8 space-y-5">
          <div class="space-y-2">
            <label for="username" class="block text-sm font-medium text-stone-700">Username</label>
            <input id="username" name="username" type="text" autocomplete="username" required class="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base transition-colors hover:border-stone-500">
          </div>
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-stone-700">Email address</label>
            <input id="email" name="email" type="email" autocomplete="email" required class="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base transition-colors hover:border-stone-500">
          </div>
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-stone-700">Password</label>
            <input id="password" name="password" type="password" autocomplete="new-password" required class="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base transition-colors hover:border-stone-500">
          </div>
          <div class="space-y-2">
            <label for="role" class="block text-sm font-medium text-stone-700">I?m here to</label>
            <select id="role" name="role" class="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base transition-colors hover:border-stone-500"><option value="BUYER">Discover and shop</option><option value="SELLER">Sell my products</option></select>
          </div>
          <p v-if="formError" role="alert" class="text-sm text-red-800">{{ formError }}</p>
          <button type="submit" :disabled="submitting" :aria-busy="submitting" class="min-h-12 rounded-full bg-emerald-950 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-800 w-full disabled:opacity-60">{{ submitting ? 'Creating account?' : 'Create my account' }} <i class="pi pi-arrow-right ml-3" aria-hidden="true"></i></button>
          <p class="pt-2 text-center text-sm text-stone-500">Already part of the collection? <RouterLink to="/login" class="font-medium text-emerald-950 underline underline-offset-4">Sign in</RouterLink></p>
        </form>
      </div>
    </div>
  </section>
</template>
