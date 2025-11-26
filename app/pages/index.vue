<script setup>
import FeaturesSummary from '../Components/FeaturesSummary.vue'
import FeaturesDetail from '../Components/FeaturesDetail.vue'
import Integrations from '../Components/Integrations.vue';
import Testimonials from '../Components/Testimonials.vue';
import Security from '../Components/Security.vue'
import Footer from '../Components/Footer.vue';
import Hero from '../Components/Hero.vue';
import '../styles/main.scss';

definePageMeta({
  layout: 'default'
})
</script>

<template>
    <main class="main">
    <Hero/>
    <FeaturesSummary/>
    <FeaturesDetail/>
    <Integrations/>
    <Security/>
    <Testimonials/>
    <Footer/>
  </main>
</template>