<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

const currentSlide = ref(0);
const paused = ref(false);
const hovered = ref(false);
const focused = ref(false);
const hidden = ref(false);
const reducedMotion = ref(false);
const mounted = ref(false);
const playing = computed(() => mounted.value && !paused.value && !hovered.value && !focused.value && !hidden.value && !reducedMotion.value);
let timer;
let motionPreference;

const slides = [
  {
    eyebrow: 'THE EVERYDAY EDIT',
    title: 'Good finds.',
    accent: 'Great days.',
    description: 'Good sound. Great style. Discover the things that make your everyday feel a little more you.',
    label: 'Explore the collection',
    category: 'All',
    image: new URL('../assets/images/headphone.png', import.meta.url).href,
    alt: 'Music lover wearing white headphones and a green jacket',
    background: 'bg-orange-50',
    art: 'bg-emerald-900',
    imageClass: 'h-72 w-auto object-contain object-bottom sm:h-96 lg:h-112',
    note: 'Turn up your everyday',
  },
  {
    eyebrow: 'MAKE YOUR NEXT MOVE',
    title: 'Go your',
    accent: 'own way.',
    description: 'Fresh perspectives start with the details. Find your next favourite in our style collection.',
    label: 'Discover style',
    category: 'Style',
    image: new URL('../assets/images/kick.png', import.meta.url).href,
    alt: 'Sneakers from the style collection',
    background: 'bg-stone-100',
    art: 'bg-orange-200',
    imageClass: 'h-64 w-full object-contain p-6 sm:h-80 lg:h-96',
    note: 'Made for your rotation',
  },
  {
    eyebrow: 'SMALL DETAILS. BIG DIFFERENCE.',
    title: 'Meet your',
    accent: 'daily rituals.',
    description: 'From your morning playlist to your evening wind-down. Explore technology for the way you live.',
    label: 'Explore technology',
    category: 'Tech',
    image: new URL('../assets/images/Apple/homepod.png', import.meta.url).href,
    alt: 'Apple HomePod speaker',
    background: 'bg-emerald-50',
    art: 'bg-emerald-200',
    imageClass: 'h-64 w-full object-contain p-8 sm:h-80 lg:h-96',
    note: 'A sound addition',
  },
];

function goToSlide(index) {
  currentSlide.value = (index + slides.length) % slides.length;
  restartTimer();
}
function restartTimer() {
  clearInterval(timer);
  if (playing.value) timer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 6500);
}
function updateMotion(event) { reducedMotion.value = event.matches; }
function updateVisibility() { hidden.value = document.hidden; }
function leaveFocus(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) focused.value = false;
}
watch(playing, restartTimer);
onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion.value = motionPreference.matches;
  motionPreference.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateVisibility);
  updateVisibility();
  mounted.value = true;
});
onUnmounted(() => {
  clearInterval(timer);
  motionPreference?.removeEventListener('change', updateMotion);
  document.removeEventListener('visibilitychange', updateVisibility);
});

const categories = [
  { name: 'Tech', detail: 'Better connected', image: new URL('../assets/images/Apple/airpod.png', import.meta.url).href, background: 'bg-stone-100' },
  { name: 'Style', detail: 'Wear it your way', image: new URL('../assets/images/kick.png', import.meta.url).href, background: 'bg-orange-50' },
  { name: 'Home', detail: 'Make yourself at home', image: new URL('../assets/images/Apple/homepod.png', import.meta.url).href, background: 'bg-emerald-50' },
  { name: 'Beauty', detail: 'Your daily rituals', image: new URL('../assets/images/beauty.jpg', import.meta.url).href, background: 'bg-rose-50' },
  { name: 'Accessories', detail: 'The finishing touches', image: new URL('../assets/images/Apple/watch.png', import.meta.url).href, background: 'bg-amber-50' },
];
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
    <h1 class="sr-only">ShopEase ? discover your everyday favourites</h1>
    <div class="grid gap-4 lg:grid-cols-3">
      <section
        aria-label="Featured collections"
        aria-roledescription="carousel"
        class="relative min-w-0 overflow-hidden rounded-2xl lg:col-span-2"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        @focusin="focused = true"
        @focusout="leaveFocus"
      >
        <div
          class="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none"
          :style="{ transform: 'translateX(-' + currentSlide * 100 + '%)' }"
          :aria-live="playing ? 'off' : 'polite'"
        >
          <article
            v-for="(slide, index) in slides"
            :key="slide.title"
            :inert="currentSlide !== index"
            :aria-hidden="currentSlide !== index"
            :aria-label="(index + 1) + ' of ' + slides.length"
            role="group"
            aria-roledescription="slide"
            :class="slide.background"
            class="relative grid w-full shrink-0 grid-cols-1 overflow-hidden sm:min-h-128 sm:grid-cols-2"
          >
            <div class="relative z-10 px-6 pb-4 pt-8 sm:py-12 sm:pl-8 sm:pr-0 lg:pl-10">
              <p class="mb-5 text-xs font-semibold tracking-widest text-emerald-900">{{ slide.eyebrow }}</p>
              <h2 class="font-serif text-4xl leading-tight tracking-tight text-emerald-950 sm:text-5xl">
                {{ slide.title }}<br><em class="font-normal text-orange-800">{{ slide.accent }}</em>
              </h2>
              <p class="mt-6 max-w-xs text-base leading-relaxed text-stone-600">{{ slide.description }}</p>
              <RouterLink
                :to="{ path: '/', query: { category: slide.category }, hash: '#featured-products' }"
                class="mt-7 inline-flex min-h-12 items-center gap-4 rounded-full bg-emerald-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
              >
                {{ slide.label }} <i class="pi pi-arrow-up-right" aria-hidden="true"></i>
              </RouterLink>
            </div>
            <div class="relative flex min-w-0 items-end justify-center overflow-hidden pb-12 sm:pb-0">
              <div :class="slide.art" class="absolute bottom-0 left-4 right-4 top-6 rounded-t-full sm:left-6 sm:right-6 sm:top-10"></div>
              <span class="absolute right-6 top-8 z-10 flex h-20 w-20 -rotate-12 items-center justify-center rounded-full bg-orange-200 p-3 text-center text-xs font-medium leading-tight text-emerald-950 sm:top-12">
                {{ slide.note }}
              </span>
              <img :src="slide.image" :alt="slide.alt" :class="slide.imageClass" class="relative z-10 max-w-full" :fetchpriority="index === 0 ? 'high' : 'auto'">
            </div>
          </article>
        </div>
        <div class="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between">
          <div class="flex items-center gap-1" aria-label="Choose a slide">
            <button
              v-for="(_, index) in slides"
              :key="index"
              type="button"
              :aria-label="'Show collection ' + (index + 1)"
              :aria-current="currentSlide === index ? 'true' : undefined"
              @click="goToSlide(index)"
              class="flex h-11 w-8 items-center justify-center"
            >
              <span class="h-2 rounded-full transition-all motion-reduce:transition-none" :class="currentSlide === index ? 'w-6 bg-emerald-950' : 'w-2 bg-stone-400'"></span>
            </button>
          </div>
          <div class="flex gap-2">
            <button v-if="!reducedMotion" type="button" @click="paused = !paused" :aria-label="paused ? 'Resume automatic slideshow' : 'Pause automatic slideshow'" :aria-pressed="paused" class="h-11 w-11 rounded-full border border-stone-300 bg-white/90 text-emerald-950 hover:bg-white">
              <i :class="paused ? 'pi pi-play' : 'pi pi-pause'" aria-hidden="true"></i>
            </button>
            <button type="button" @click="goToSlide(currentSlide - 1)" aria-label="Previous collection" class="h-11 w-11 rounded-full border border-stone-300 bg-white/90 text-emerald-950 hover:bg-white"><i class="pi pi-arrow-left" aria-hidden="true"></i></button>
            <button type="button" @click="goToSlide(currentSlide + 1)" aria-label="Next collection" class="h-11 w-11 rounded-full border border-stone-300 bg-white/90 text-emerald-950 hover:bg-white"><i class="pi pi-arrow-right" aria-hidden="true"></i></button>
          </div>
        </div>
      </section>
      <RouterLink :to="{ path: '/', query: { category: 'Style' }, hash: '#featured-products' }" class="group relative flex min-h-72 flex-col justify-end overflow-hidden rounded-2xl bg-stone-200 lg:min-h-128">
        <img src="../assets/images/clothing.jpg" alt="Green patterned outfit from the style collection" class="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none">
        <div class="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/10 to-transparent"></div>
        <div class="relative p-6 text-white sm:p-8">
          <p class="mb-3 text-xs font-medium uppercase tracking-widest text-orange-100">A fresh perspective</p>
          <h2 class="font-serif text-4xl leading-tight">Find your<br>kind of style.</h2>
          <span class="mt-5 flex min-h-11 items-center justify-between border-t border-white/30 pt-4 text-sm">Explore the style edit <i class="pi pi-arrow-up-right" aria-hidden="true"></i></span>
        </div>
      </RouterLink>
    </div>

    <section aria-labelledby="categories-heading" class="pb-8 pt-12 sm:pb-12 sm:pt-16">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div><p class="mb-2 text-xs font-medium uppercase tracking-widest text-stone-500">A world of good finds</p><h2 id="categories-heading" class="font-serif text-3xl tracking-tight text-emerald-950 sm:text-4xl">What catches your eye?</h2></div>
        <RouterLink :to="{ path: '/', query: { category: 'All' }, hash: '#featured-products' }" class="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-emerald-950 underline decoration-stone-300 underline-offset-4">Explore everything <i class="pi pi-arrow-right" aria-hidden="true"></i></RouterLink>
      </div>
      <ul class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <li v-for="category in categories" :key="category.name" class="min-w-0">
          <RouterLink :to="{ path: '/', query: { category: category.name }, hash: '#featured-products' }" class="group block">
            <div :class="category.background" class="flex aspect-square items-center justify-center overflow-hidden rounded-xl p-6">
              <img :src="category.image" alt="" loading="lazy" class="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none">
            </div>
            <div class="mt-4 flex items-center justify-between gap-2"><h3 class="text-base font-medium text-stone-900">{{ category.name }}</h3><i class="pi pi-arrow-up-right text-xs text-stone-500" aria-hidden="true"></i></div>
            <p class="mt-1 text-sm text-stone-500">{{ category.detail }}</p>
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>
