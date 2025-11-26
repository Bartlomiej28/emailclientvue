<template>
  <section class="h-100 d-flex align-items-center justify-content-center">
    <p class="text-xl">Write or Select an Email from Sidebar</p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'main',
  middleware: 'auth'
})
</script>