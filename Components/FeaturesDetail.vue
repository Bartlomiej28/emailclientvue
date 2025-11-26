<script setup>
import '../styles/main.scss'
</script>

<template>
    <section class="features-detail section section--color-secondary" id="features">
        <div class="features-detail__content container">
            <div class="section__heading">
                <h2 class="section__title">Funkcje w szczegółach</h2>
                <p class="section__subtitle">Odkryj zaawansowane funkcjonalności, które sprawiają, że MailWise to najlepszy klient poczty.</p>
            </div>
            <div class="features-detail__grid">
                <div class="feature-item feature-item--snooze">
                    <div class="feature-item__header">
                        <div class="feature-item__icon-wrapper">
                            <svg class="feature-item__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                        </div>
                        <h3 class="feature-item__title">Drzemka i Planowanie</h3>
                    </div>
                    <p class="feature-item__text">Tymczasowo usuwaj e-maile ze skrzynki odbiorczej i spraw, by pojawiały się ponownie o określonej godzinie. Planuj wysyłkę e-maili na później, zapewniając, że dotrą w idealnym momencie.</p>
                    <div class="feature-item__progress-bar">
                        <div class="feature-item__progress-fill"></div>
                    </div>
                </div>
                <div class="feature-item">
                    <div class="feature-item__header">
                        <div class="feature-item__icon-wrapper">
                            <svg class="feature-item__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-3 8h.01" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                        </div>
                        <h3 class="feature-item__title">Szablony e-maili</h3>
                    </div>
                    <p class="feature-item__text">Oszczędzaj czas, tworząc i używając gotowych szablonów do często wysyłanych e-maili. Idealne do kontaktu, follow-upów i typowych zapytań.</p>
                    <div class="feature-item__template-preview">
                        <span class="feature-item__template-text">Szablon follow-up.eml</span>
                        <button class="feature-item__template-button">Użyj szablonu</button>
                    </div>
                </div>
                <div class="feature-item">
                    <div class="feature-item__header">
                        <div class="feature-item__icon-wrapper">
                            <svg class="feature-item__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V8z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                        </div>
                        <h3 class="feature-item__title">Wspólne szkice</h3>
                    </div>
                    <p class="feature-item__text">Pracuj nad e-mailami z zespołem w czasie rzeczywistym. Widź zmiany na bieżąco i zostawiaj komentarze, upewniając się, że wszyscy są na tej samej stronie przed wysłaniem.</p>
                    <div class="feature-item__avatar-group">
                        <img alt="User 1" class="feature-item__avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzTlzN5eQiEo1krfdUVrWIG5OaxRHpXUjbkhcNRFSVqFEF_mCgCwp5jtaseSyUmJtMyO0LTKKrN0HOncOGwh6jrUJxpWqFnEA3BejsheFF_tss7Sa9ocAuRNXPGdfaid-TJvvC_eIrdjoen61JPZMiq8NUAwSfqNCAgU_59Hi2MWU4pUZC7fttls71LbVC8FtLurAtMDRh3JqVFpZekj5fcaDEUqJae3bnIGUETpbBWOmKOaYbTHMEQQTfcb3e64Xp2Gjf37Wcqhk"/>
                        <img alt="User 2" class="feature-item__avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7abdughcxncpyunpI4su6K7zPLnG-r4Z6thLWmxVQXNArEKZBtJ009E0pLN6ImXlkY7KW2F4L4Pn4CU6LheMtgQ0NDOKWFNUPcn3kPKRF70qB39XKY9vNUJicTnMMLIhq7tlKPRLkSOWAVV45dOZMCBVc5pYwGb_HtBTUsWqLXjsZW5iIjlgl_dpdbS4vkyuha8vamL43fDw6GpbW25FZxFqf10KIubwRafIa9mBtMi6gxI-7czM944cgUi0_qFWFHATqONNaBzA"/>
                        <img alt="User 3" class="feature-item__avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2Fi67yde4yfG9Xf6gydXD3O2pGQU-7ls9XbYeAt8Kyrh97gK05iql7wYq0-veGvXtHjaLAC0ok7CAPt26rvQXHVLlQIyD11yiCL43t2_efDGxQHmxmvq7mViVXSclysXojOaoIXBMvIaKw88y2HFjPSwb8TvWz_qLG7bDBsugrWkncOgsFr28TjReChQY7JsItWhhRObeRfWSbtl1GuR9p7eryEVHFngdwWRxzOgzszwT-sDjTPzyABveaafjtJ-X2dAFlN_h-qM"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>