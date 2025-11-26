<script setup>
import '../styles/main.scss'
</script>

<template>
    <section class="security section section--color-secondary" id="security">
        <div class="security__content container">
            <div class="section__heading">
                <h2 class="section__title">Twoje bezpieczeństwo i prywatność, nasz priorytet</h2>
                <p class="section__subtitle">Zobowiązujemy się do ochrony Twoich danych za pomocą solidnych środków bezpieczeństwa i przejrzystej polityki prywatności.</p>
            </div>
            <div class="security__grid">
                <div class="security-feature">
                    <div class="security-feature__icon-wrapper">
                        <svg class="security-feature__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                    </div>
                    <h3 class="security-feature__title">Szyfrowanie End-to-End</h3>
                    <p class="security-feature__text">Twoje e-maile są szyfrowane od momentu wysłania, aż do dotarcia do odbiorcy, zapewniając, że nikt po drodze nie może ich przeczytać.</p>
                </div>
                <div class="security-feature">
                    <div class="security-feature__icon-wrapper">
                        <svg class="security-feature__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118-8.016z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                    </div>
                    <h3 class="security-feature__title">Uwierzytelnianie Dwuskładnikowe</h3>
                    <p class="security-feature__text">Dodaj dodatkową warstwę zabezpieczeń do swojego konta. Z 2FA będziesz musiał podać dwie formy identyfikacji, aby się zalogować.</p>
                </div>
                <div class="security-feature">
                    <div class="security-feature__icon-wrapper">
                        <svg class="security-feature__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                    </div>
                    <h3 class="security-feature__title">Nie sprzedajemy danych</h3>
                    <p class="security-feature__text">Nigdy nie sprzedamy Twoich danych osobowych. Nasz model biznesowy opiera się na dostarczaniu świetnego produktu, a nie na monetyzacji Twoich informacji.</p>
                </div>
            </div>
        </div>
    </section>
</template>