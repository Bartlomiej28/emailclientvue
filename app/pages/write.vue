<template>
    <div class="main__inbox container-fluid p-0 d-flex flex-column h-100">
        <div class="flex-grow-1 overflow-auto">
            <div class="mb-3">
                <div class="input-group">
                    <span class="input-group-text bg-white border-end-0 text-muted">To:</span>
                    <input 
                        v-model="form.to" 
                        type="email" 
                        class="form-control border-start-0 shadow-none" 
                        :class="{ 'is-invalid': errors.to }"
                        placeholder="recipient@example.com"
                    />
                </div>
                <div class="invalid-feedback d-block" v-if="errors.to">{{ errors.to }}</div>
            </div>

            <div class="mb-3">
                <div class="input-group">
                    <span class="input-group-text bg-white border-end-0 text-muted">Subject:</span>
                    <input 
                        v-model="form.subject" 
                        type="text" 
                        class="form-control border-start-0 shadow-none" 
                        :class="{ 'is-invalid': errors.subject }"
                        placeholder="Enter subject"
                    />
                </div>
                <div class="invalid-feedback d-block" v-if="errors.subject">{{ errors.subject }}</div>
            </div>

            <div class="mb-3">
                <Editor v-model="form.content" editorStyle="height: 300px; max-height: 50vh; overflow-y: auto;" />
                <div class="text-danger small mt-1" v-if="errors.content">{{ errors.content }}</div>
            </div>

            <div class="d-flex align-items-center gap-3 mt-4 pb-4">
                <button 
                    type="button" 
                    class="btn btn-dark px-4" 
                    @click="submitForm"
                    :disabled="isSending"
                >
                    <span v-if="isSending" class="spinner-border spinner-border-sm me-2"></span>
                    {{ isSending ? 'Sending...' : 'Send Message' }}
                </button>
                
                <span v-if="successMessage" class="text-success small fw-bold">{{ successMessage }}</span>
                <span v-if="errorMessage" class="text-danger small fw-bold">{{ errorMessage }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'main',
    middleware: 'auth'
})
import { handleSendEmail, GetCurrentUser } from "~~/lib/api"; 
import { reactive, ref, onMounted } from "vue";
import Editor from "primevue/editor";
import { z } from "zod";    

type FormErrors = {
    to: string | null;
    subject: string | null;
    content: string | null;
};

const schema = z.object({
    to: z.string().email("Please provide a valid email address."),
    subject: z.string().min(3, "The subject must be at least 3 characters long."),
    content: z.string().min(5, "The content is too short.")
});

const form = reactive({
    to: '',
    subject: '',
    content: ''
});

const errors = reactive<FormErrors>({
    to: null,
    subject: null,
    content: null
});

const successMessage = ref('');
const isSending = ref(false);
const errorMessage = ref('');

const currentUser = ref<any>(null);

onMounted(async () => {
    currentUser.value = await GetCurrentUser();
});

const submitForm = async () => {
    errors.to = null;
    errors.subject = null;
    errors.content = null;
    successMessage.value = '';
    errorMessage.value = '';

    const result = schema.safeParse(form);

    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        
        errors.to = fieldErrors.to?.[0] || null;
        errors.subject = fieldErrors.subject?.[0] || null;
        errors.content = fieldErrors.content?.[0] || null;
        return;
    }

    if (!currentUser.value) {
        errorMessage.value = "Error: User not logged in.";
        return;
    }

    isSending.value = true;
    
    const response = await handleSendEmail({
        to: form.to,
        subject: form.subject,
        content: form.content,
        authorEmail: currentUser.value.email,
        authorName: currentUser.value.name
    });

    isSending.value = false;

    if (response.success) {
        successMessage.value = "The message has been sent!";

        form.to = '';
        form.subject = '';
        form.content = '';
    } else {
        errorMessage.value = response.error || "An error occurred while sending.";
    }
};
</script>

<style scoped>

.border-danger {
    border-color: #dc3545 !important;
}
</style>