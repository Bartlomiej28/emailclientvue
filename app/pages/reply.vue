<template>
    <div class="main__inbox">
        <hr />
        <div class="main__inbox-write p-4">
            
            <div class="mb-3">
                <input 
                    v-model="form.to" 
                    type="text" 
                    placeholder="Reply To: (email)" 
                    class="main__inbox-write-input py-2 px-4 w-100"
                    :class="{ 'border-danger': errors.to }" 
                />
                <small v-if="errors.to" class="text-danger d-block mt-1">{{ errors.to }}</small>
            </div>

            <div class="mb-3">
                <input 
                    v-model="form.subject" 
                    type="text" 
                    placeholder="Reply Subject:" 
                    class="main__inbox-write-input py-2 px-4 w-100" 
                    :class="{ 'border-danger': errors.subject }"
                />
                <small v-if="errors.subject" class="text-danger d-block mt-1">{{ errors.subject }}</small>
            </div>
            
            <div class="mt-4">
                <Editor v-model="form.content" editorStyle="height: 320px" />
                <small v-if="errors.content" class="text-danger d-block mt-1">{{ errors.content }}</small>
            </div>

            <div class="d-flex align-items-center gap-3 mt-4">
                <button type="button" class="btn btn-dark" @click="submitForm" :disabled="isSending">
                    <span v-if="isSending">Sending...</span>
                    <span v-else>Submit</span>
                </button>
                <span v-if="successMessage" class="text-success">{{ successMessage }}</span>
                <span v-if="errorMessage" class="text-danger">{{ errorMessage }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'main',
    middleware: 'auth'
})

import { reactive, ref, onMounted } from "vue";
import { handleSendEmail } from "~~/lib/api";
import { useRoute } from "vue-router";
import Editor from "primevue/editor";
import { z } from "zod";

const route = useRoute() ;

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


onMounted(() => {
    if (route.query.to) form.to = route.query.to;
    if (route.query.subject) form.subject = route.query.subject;
});

const errors = reactive({
    to: null,
    subject: null,
    content: null
});
const isSending = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

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

    isSending.value = true;
    
    const response = await handleSendEmail({
        to: form.to,
        subject: form.subject,
        content: form.content
    });

    isSending.value = false;

    if (response.success) {
        successMessage.value = "The message has been sent!";
        form.to = '';
        form.subject = '';
        form.content = '';
    } else {
        errorMessage.value = response.error || "An error occurred while sending. Please try again later.";
    }
};
</script>