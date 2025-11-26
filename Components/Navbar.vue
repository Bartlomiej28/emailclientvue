<script setup>
import '../styles/main.scss'
</script>
<template>
<header class="header">
    <div class="header__content container">
            <div class="header__logo-group">
                <svg class="header__logo-icon" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="var(--primary-color)" fill-rule="evenodd"></path>
                </svg>
                <h2 class="header__logo-text">MailWise</h2>
            </div>
            <nav class="header__navigation">
                <a class="header__nav-link" href="#features">Funkcje</a>
                <a class="header__nav-link" href="#integrations">Integracje</a>
                <a class="header__nav-link" href="#security">Bezpieczeństwo</a>
            </nav>
            <div class="header__action-group">
                <NuxtLink class="button button--secondary" to="/sign-in">
                    <span class="button__text">Zaloguj się</span>
                </NuxtLink>

                <NuxtLink class="button button--primary" to="/sign-up">
                    <span class="button__text">Zarejestruj się</span>
                </NuxtLink>
            </div>
        </div>
    </header>
</template>