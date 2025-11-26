<script setup>
import '../styles/main.scss'

</script>
<template>
    <section class="features-summary section">
        <div class="features-summary__content container">
            <div class="section__heading">
                <h2 class="section__title">Kluczowe funkcje</h2>
                <p class="section__subtitle">MailWise oferuje szereg potężnych funkcji zaprojektowanych, aby poprawić Twoje doświadczenie z pocztą.</p>
            </div>
            <div class="features-summary__grid">
                <div class="feature-card">
                    <div class="feature-card__icon-wrapper">
                        <svg class="feature-card__icon" fill="var(--primary-color)" height="32px" viewBox="0 0 256 256" width="32px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,16V152h-28.7A15.86,15.86,0,0,0,168,156.69L148.69,176H107.31L88,156.69A15.86,15.86,0,0,0,76.69,152H48V48Zm0,160H48V168H76.69L96,187.31A15.86,15.86,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40Z"></path>
                        </svg>
                    </div>
                    <h3 class="feature-card__title">Inteligentna Skrzynka</h3>
                    <p class="feature-card__text">Automatycznie sortuje Twoje e-maile na kategorie, priorytetyzując ważne wiadomości i filtrując rozpraszacze.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-card__icon-wrapper">
                        <svg class="feature-card__icon" fill="var(--primary-color)" height="32px" viewBox="0 0 256 256" width="32px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                        </svg>
                    </div>
                    <h3 class="feature-card__title">Zaawansowane Wyszukiwanie</h3>
                    <p class="feature-card__text">Szybko znajdź dowolny e-mail dzięki naszym potężnym możliwościom wyszukiwania, w tym filtrom dla nadawcy, tematu i słów kluczowych.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-card__icon-wrapper">
                        <svg class="feature-card__icon" fill="var(--primary-color)" height="32px" viewBox="0 0 256 256" width="32px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.68l50.34-50.34a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path>
                        </svg>
                    </div>
                    <h3 class="feature-card__title">Wzmocnione Bezpieczeństwo</h3>
                    <p class="feature-card__text">Chroń swoje e-maile za pomocą wiodących w branży środków bezpieczeństwa, w tym szyfrowania i uwierzytelniania dwuskładnikowego.</p>
                </div>
            </div>
        </div>
    </section>
</template>