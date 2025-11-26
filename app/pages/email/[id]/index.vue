<template>
    <div class="email-container">
        <div v-if="isLoading">
            <EmailSkeleton/>
        </div>

        <div v-else-if="mail">
            <hr />
            <div>
                <p>From: {{ mail.emailAuthor }}</p>
                <p class="mb-0">Subject: {{ mail.emailSubject }}</p>
                <hr />
                
                <div 
                    class="email-content"
                    v-html="mail.emailText"
                ></div>
            </div>
        </div>

        <div v-else>
            <p>Failed to load message.</p>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'main'
});
import { handleGetEmailById, markEmailAsRead, GetCurrentUser } from "~~/lib/api";
import EmailSkeleton from "../../Components/EmailSkeleton.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const currentMailContext = useState('currentMailContext', () => null);
const route = useRoute();

const isLoading = ref(true);
const mail = ref(null);

onMounted(async()=>{
    const user = await GetCurrentUser();
    const mailId = route.params.id;
    try {
        isLoading.value = true;
        const response = await handleGetEmailById(mailId);
        mail.value = response;

        currentMailContext.value = response;

        if (response && response.isRead === false && response.emailTo === user.email) markEmailAsRead(mailId);
        
    } catch (error) {
        console.error("Błąd pobierania maila:", error);
    } finally {
        isLoading.value = false;
    }
})

onUnmounted(() => {
    currentMailContext.value = null;
})
</script>

<style lang="scss" scoped>
.email-content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal; 

    :deep(img) {
        max-width: 100%;
        height: auto;
    }
    
    :deep(pre) {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
}
</style>