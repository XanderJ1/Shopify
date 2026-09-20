<script setup>
import { computed, nextTick, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { HOST_URL } from '../config';
import AccountNav from './AccountNav.vue';

const name = ref('');
const description = ref('');
const price = ref('');
const submitting = ref(false);
const formError = ref('');
const imageError = ref('');
const saved = ref(false);
const previewUrl = ref('');
const fileName = ref('');
const fileInputRef = ref(null);
const successHeading = ref(null);
const previewPrice = computed(() => price.value !== '' && Number.isFinite(Number(price.value))
  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(price.value))
  : '$0.00');
const completeCount = computed(() => [name.value.trim(), description.value.trim(), price.value !== '' && Number.isInteger(Number(price.value)) && Number(price.value) >= 0].filter(Boolean).length);
function clearImage() {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = '';
  fileName.value = '';
  imageError.value = '';
  if (fileInputRef.value) fileInputRef.value.value = '';
}
function selectImage(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    clearImage();
    imageError.value = 'Please choose an image file.';
    return;
  }
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = URL.createObjectURL(file);
  fileName.value = file.name;
  imageError.value = '';
}
function startAnother() {
  name.value = '';
  description.value = '';
  price.value = '';
  clearImage();
  saved.value = false;
  formError.value = '';
}
function handleSubmit() {
  if (submitting.value || saved.value) return;
  if (!name.value.trim() || !description.value.trim() || price.value === '' || !Number.isInteger(Number(price.value)) || Number(price.value) < 0) {
    formError.value = 'Add a name, description, and a valid whole-dollar price.';
    return;
  }
  submitting.value = true;
  formError.value = '';
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const productDTO = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: parseInt(document.getElementById('price').value)
  };
  const fileInput = document.getElementById('file');
  const formData = new FormData();
  formData.append('productDTO', new Blob([JSON.stringify(productDTO)], { type: 'application/json' }));
  formData.append('file', fileInput.files[0]);
  axios.post(`${HOST_URL}api/v1/products`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then(async () => { saved.value = true; await nextTick(); successHeading.value?.focus(); })
    .catch(() => { formError.value = 'We could not save your product. Your details are still here. Please try again.'; })
    .finally(() => { submitting.value = false; });
}
onUnmounted(() => { if (previewUrl.value) URL.revokeObjectURL(previewUrl.value); });
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
    <AccountNav />
    <div class="mb-8">
      <p class="mb-3 text-xs font-medium uppercase tracking-widest text-orange-800">YOUR SELLER SPACE</p>
      <h1 class="font-serif text-4xl tracking-tight text-emerald-950 sm:text-5xl">Make it a good find.</h1>
      <p class="mt-4 text-base text-stone-500">Give your product a photo, a story, and a place in the collection.</p>
    </div>
    <div v-if="saved" role="status" class="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center">
      <span class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-emerald-900"><i class="pi pi-check" aria-hidden="true"></i></span>
      <h2 ref="successHeading" tabindex="-1" class="mt-5 font-serif text-3xl text-emerald-950">A new find, ready to discover.</h2>
      <p class="mt-3 break-words text-stone-600">"{{ name }}" has been added to your products.</p>
      <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><RouterLink to="/myProducts" class="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-emerald-950 px-6 text-sm text-white">View my products<i class="pi pi-arrow-right" aria-hidden="true"></i></RouterLink><button type="button" @click="startAnother" class="min-h-12 rounded-full border border-emerald-300 bg-white px-6 text-sm text-emerald-950">Add another product</button></div>
    </div>
    <div v-else class="grid items-start gap-8 lg:grid-cols-3">
      <form id="product-form" @submit.prevent="handleSubmit" class="min-w-0 space-y-6 lg:col-span-2">
        <fieldset :disabled="submitting" class="min-w-0 space-y-6">
          <legend class="sr-only">Product information</legend>
          <section aria-labelledby="basics-heading" class="rounded-2xl border border-stone-200 bg-white p-5 sm:p-8">
            <div class="mb-7 flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-xs font-medium text-orange-800">01</span><h2 id="basics-heading" class="font-serif text-2xl text-emerald-950">Start with the details</h2></div>
            <div class="space-y-6">
              <div class="space-y-2"><label for="name" class="block text-sm font-medium text-stone-800">Product name <span class="text-orange-800" aria-hidden="true">*</span></label><input v-model="name" id="name" name="name" type="text" required placeholder="e.g. Everyday wireless headphones" aria-describedby="name-hint" class="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base placeholder:text-stone-400"><p id="name-hint" class="text-sm text-stone-500">Keep it clear, specific, and easy to find.</p></div>
              <div class="space-y-2"><label for="description" class="block text-sm font-medium text-stone-800">Description <span class="text-orange-800" aria-hidden="true">*</span></label><textarea v-model="description" id="description" name="description" rows="5" required placeholder="Tell shoppers what makes this product a good find." aria-describedby="description-hint" class="w-full resize-y rounded-xl border border-stone-300 bg-white px-4 py-3 text-base leading-relaxed placeholder:text-stone-400"></textarea><p id="description-hint" class="text-sm text-stone-500">Include useful details such as materials, dimensions, and what's included.</p></div>
              <div class="max-w-xs space-y-2"><label for="price" class="block text-sm font-medium text-stone-800">Price <span class="text-orange-800" aria-hidden="true">*</span></label><div class="relative"><span class="absolute left-4 top-3 text-stone-500" aria-hidden="true">$</span><input v-model="price" id="price" name="price" type="number" inputmode="numeric" min="0" step="1" required placeholder="0" aria-describedby="price-hint" class="min-h-12 w-full rounded-xl border border-stone-300 bg-white py-3 pl-9 pr-16 text-base"><span class="absolute right-4 top-4 text-xs text-stone-500" aria-hidden="true">USD</span></div><p id="price-hint" class="text-sm text-stone-500">Enter a whole-dollar amount in USD.</p></div>
            </div>
          </section>
          <section aria-labelledby="photo-heading" class="rounded-2xl border border-stone-200 bg-white p-5 sm:p-8">
            <div class="mb-6 flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-xs font-medium text-orange-800">02</span><h2 id="photo-heading" class="font-serif text-2xl text-emerald-950">Let it shine</h2><span class="ml-auto text-xs text-stone-500">Optional</span></div>
            <input ref="fileInputRef" id="file" name="file" type="file" accept="image/*" @change="selectImage" aria-describedby="image-hint image-error" class="peer sr-only">
            <label for="file" class="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 px-5 py-8 text-center transition-colors hover:border-emerald-700 hover:bg-emerald-50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-orange-700">
              <img v-if="previewUrl" :src="previewUrl" alt="Selected product photo" class="mb-4 h-32 w-32 rounded-lg object-contain">
              <span v-else class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-emerald-950"><i class="pi pi-image" aria-hidden="true"></i></span>
              <span class="text-sm font-medium text-emerald-950">{{ previewUrl ? 'Choose a different photo' : 'Choose a product photo' }}</span>
              <span class="mt-2 max-w-full break-all text-xs text-stone-500">{{ fileName || 'Click to browse your files' }}</span>
            </label>
            <div class="mt-3 flex flex-wrap items-center justify-between gap-2"><p id="image-hint" class="text-sm text-stone-500">A clear photo on a simple background works best.</p><button v-if="previewUrl" type="button" @click="clearImage" class="min-h-11 text-sm text-red-800 underline underline-offset-4">Remove photo</button></div>
            <p id="image-error" role="alert" class="mt-2 text-sm text-red-800">{{ imageError }}</p>
          </section>
        </fieldset>
        <div class="flex flex-col gap-4 rounded-2xl bg-stone-50 p-5 sm:p-6">
          <p v-if="formError" role="alert" class="text-sm text-red-800">{{ formError }}</p>
          <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p class="text-sm text-stone-500">Fields marked * are required.</p>
            <div class="flex flex-wrap items-center gap-3"><RouterLink v-if="!submitting" to="/myProducts" class="inline-flex min-h-12 items-center rounded-full px-5 text-sm text-stone-600 hover:bg-white">Cancel</RouterLink><button type="submit" :disabled="submitting" :aria-busy="submitting" class="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-emerald-950 px-6 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"><i :class="submitting ? 'pi pi-spinner motion-safe:animate-spin' : 'pi pi-plus'" aria-hidden="true"></i>{{ submitting ? 'Adding product...' : 'Add product' }}</button></div>
          </div>
        </div>
      </form>
      <aside aria-labelledby="preview-heading" class="min-w-0 space-y-5 lg:sticky lg:top-6">
        <div class="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
          <div class="mb-5 flex items-center justify-between gap-3"><h2 id="preview-heading" class="text-sm font-medium text-emerald-950">Listing preview</h2><span class="rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-800">Not saved yet</span></div>
          <div class="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-stone-100 p-6"><img v-if="previewUrl" :src="previewUrl" alt="Your listing photo preview" class="h-full w-full object-contain"><div v-else class="text-center text-stone-400"><i class="pi pi-image text-4xl" aria-hidden="true"></i><p class="mt-3 text-sm">Your photo goes here</p></div></div>
          <h3 class="mt-5 break-words text-base font-medium text-stone-900">{{ name.trim() || 'Your product name' }}</h3>
          <p class="mt-2 line-clamp-3 break-words text-sm leading-relaxed text-stone-500">{{ description.trim() || 'A short story about your next good find.' }}</p>
          <p class="mt-4 text-lg font-medium text-emerald-950">{{ previewPrice }}</p>
        </div>
        <div class="rounded-2xl bg-orange-50 p-6">
          <div class="flex items-center justify-between gap-4"><h2 class="font-serif text-xl text-emerald-950">Ready for discovery?</h2><span class="text-xs text-orange-800">{{ completeCount }}/3</span></div>
          <ul class="mt-4 space-y-3 text-sm text-stone-600">
            <li class="flex items-center gap-3"><i :class="name.trim() ? 'pi pi-check-circle text-emerald-800' : 'pi pi-circle text-stone-400'" aria-hidden="true"></i>A clear product name<span class="sr-only">{{ name.trim() ? ': complete' : ': needed' }}</span></li>
            <li class="flex items-center gap-3"><i :class="description.trim() ? 'pi pi-check-circle text-emerald-800' : 'pi pi-circle text-stone-400'" aria-hidden="true"></i>A useful description<span class="sr-only">{{ description.trim() ? ': complete' : ': needed' }}</span></li>
            <li class="flex items-center gap-3"><i :class="price !== '' && Number.isInteger(Number(price)) && Number(price) >= 0 ? 'pi pi-check-circle text-emerald-800' : 'pi pi-circle text-stone-400'" aria-hidden="true"></i>A whole-dollar price<span class="sr-only">{{ price !== '' && Number.isInteger(Number(price)) && Number(price) >= 0 ? ': complete' : ': needed' }}</span></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>
