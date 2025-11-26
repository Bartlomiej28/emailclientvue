<script setup>
import '../styles/main.scss'
</script>

<template>
    <section class="hero-section bg-dark">
        <div class="hero-section__background"></div>
        <div class="hero-section__overlay"></div>
        <div class="hero-section__content container">
            <h1 class="hero-section__title">Zapanuj nad swoją skrzynką. Uwolnij swoją produktywność.</h1>
            <p class="hero-section__subtitle">MailWise to inteligentny klient poczty, który porządkuje Twoją skrzynkę, przyspiesza Twój workflow i oddaje Ci Twój czas.</p>
            <div class="hero-section__cta-group">
                <button class="button button--large button--cta">
                    <span class="button__text">Rozpocznij za darmo</span>
                </button>
                <a class="hero-section__learn-more" href="#features">
                    <span>Dowiedz się więcej</span>
                    <svg class="hero-section__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                </a>
            </div>
        </div>
    </section>
</template>