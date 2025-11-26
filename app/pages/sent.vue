<template>
    <div class="sent-page">
        <hr/>

        <div v-if="isLoading" class="text-center p-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else>
            <div v-if="sentMails.length === 0" class="text-center text-muted p-5">
                <SendIcon size="48" class="mb-3 opacity-50" />
                <h4>No sent messages.</h4>
                <p>Messages you send will appear here.</p>
            </div>

            <div v-else class="list-group">
                <RouterLink 
                    v-for="mail in sentMails" 
                    :key="mail.$id" 
                    :to="`/email/${mail.$id}`"
                    class="list-group-item list-group-item-action p-3 text-decoration-none text-dark"
                >
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-column" style="max-width: 80%;">
                            <div class="d-flex align-items-center gap-2 mb-1">
                                <span class="fw-bold">To: {{ mail.emailTo }}</span>
                                <span class="text-muted small">{{ formatDate(mail.$createdAt) }}</span>
                            </div>
                            <span class="fw-medium">{{ mail.emailSubject }}</span>
                            <span class="text-muted small text-truncate">{{ stripHtml(mail.emailText) }}</span>
                        </div>

                        <div class="text-muted">
                           <ChevronRight size="18" />
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'main',
    middleware: 'auth'
})
import { Send as SendIcon, ChevronRight } from 'lucide-vue-next';
import { handleGetSentEmails, GetCurrentUser } from '~~/lib/api';
import { stripHtml, formatDate } from '~~/lib/utils/helpers';
import { ref, onMounted } from 'vue';

const isLoading = ref(true);
const sentMails = ref([]);

const fetchSent = async () => {
    const user = await GetCurrentUser();
    isLoading.value = true;
    sentMails.value = await handleGetSentEmails(user.email);
    isLoading.value = false;
};

onMounted(() => {
    fetchSent();
});

</script>

<style scoped>
.sent-page {
    height: 100%;
    overflow-y: scroll; 
}

.list-group-item:hover {
    background-color: #f8f9fa;
}
</style>