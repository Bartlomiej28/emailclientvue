<script setup>
import Navbar from '~~/Components/Navbar.vue'
</script>
<template>
   <div class="layout d-flex flex-column min-vh-100">
        <Navbar/>
        <slot/>
    </div>
</template>