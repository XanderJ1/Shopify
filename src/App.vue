<script setup>
import { RouterView } from 'vue-router';

import Navbar from '@/components/Navbar.vue'
import Foot from '@/views/Foot.vue';

function focusContent() {
    document.getElementById('main-content')?.focus();
}
</script>

<template>
    <div class="flex min-h-screen flex-col bg-white text-base leading-relaxed text-stone-900">
        <a href="#main-content" @click.prevent="focusContent" class="sr-only z-50 rounded-lg bg-emerald-950 p-4 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4">Skip to content</a>
        <Navbar />
        <main id="main-content" tabindex="-1" class="min-w-0 flex-1">
            <RouterView />
        </main>
        <Foot />
    </div>
</template>

<style scoped>

</style>
