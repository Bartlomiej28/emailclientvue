<template>
    <div class="trash-page">
        <hr/>
        <div v-if="isLoading" class="text-center p-5">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else>
            <div v-if="trashMails.length === 0" class="text-center text-muted p-5">
                <Trash2 :size="48" class="mb-3 opacity-50" />
                <h4>The trash is empty</h4>
                <p>Deleted messages will appear here.</p>
            </div>

            <div v-else class="list-group">
                <div 
                    v-for="mail in trashMails" 
                    :key="mail.$id" 
                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3"
                >
                    <div class="d-flex flex-column" style="max-width: 70%;">
                        <div class="d-flex align-items-center gap-2 mb-1">
                            <span class="fw-bold">{{ mail.emailAuthor }}</span>
                            <span class="text-muted small">{{ formatDate(mail.$createdAt) }}</span>
                        </div>
                        <span class="fw-medium">{{ mail.emailSubject }}</span>
                        <span class="text-muted small text-truncate">{{ stripHtml(mail.emailText) }}</span>
                    </div>

                    <div class="d-flex gap-2">
                        <button 
                            class="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
                            @click="restoreMail(mail.$id)"
                            title="Przywróć do Inbox"
                        >
                            <RotateCcw :size="16" /> Restore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
    layout: 'main',
    middleware: 'auth'
})

import { handleGetTrashEmails, handleRestoreEmail, GetCurrentUser } from "~~/lib/api";
import { stripHtml, formatDate } from "~~/lib/utils/helpers";
import { Trash2, RotateCcw } from "lucide-vue-next";
import { ref, onMounted } from "vue";

interface EmailDocument {
    $id: string;
    $createdAt: string;
    emailAuthor: string;
    emailSubject: string;
    emailText: string;
}

const isLoading = ref(true);
const trashMails = ref<EmailDocument[]>([]);

const fetchTrash = async () => {
    isLoading.value = true;
    const user = await GetCurrentUser();

    if (!user) {
        console.error("User not found");
        isLoading.value = false;
        return;
    }

    const response = await handleGetTrashEmails(user.email);
    trashMails.value = response as unknown as EmailDocument[];
    isLoading.value = false;
};

onMounted(() => {
    fetchTrash();
});

const restoreMail = async (id: string) => {
    const res = await handleRestoreEmail(id);
    if (res.success) trashMails.value = trashMails.value.filter(m => m.$id !== id);
};

</script>

<style scoped>
.trash-page {
    height: 100%;
    overflow-y: scroll;
}
</style>