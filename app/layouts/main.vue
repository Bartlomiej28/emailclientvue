<template>
    <div class="main container-fluid h-100 p-0 overflow-hidden">
        <div class="d-flex h-100 w-100 position-relative">
            <div 
                class="sidebar-container h-100 border-end" 
                :class="{ 'sidebar-hidden': !isSidebarVisible }"
            >
                <div class="sidebar-wrapper h-100">
                    <Sidebar @close-sidebar="closeSidebarOnMobile"/>
                </div>

                <div class="aside-wrapper">
                    <Aside @close-sidebar="closeSidebarOnMobile"/>
                </div>
            </div>

            <div class="main-content flex-grow-1 vh-100 d-flex flex-column bg-white" style="min-width: 0">
                
                <div class="main__inbox-header d-flex align-items-center px-3 py-2 border-bottom flex-shrink-0">
                    <button class="btn btn-link text-secondary p-0 me-3" @click="handleShowHideSidebarAndAside">
                        <square-split-horizontal :size="20" />
                    </button>

                    <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item active">Inbox</li>
                            <li class="breadcrumb-item" aria-current="page">{{formattedRouteName}}</li>
                        </ol>
                    </nav>
                </div>

                <div class="pt-4 mx-0 px-4 flex-shrink-0">
                    <div class="main__inbox-inbox_buttons d-flex gap-2 mb-3">
                        <button class="main__inbox-button"  title="Reply" :disabled="isWriteRoute || !currentMailContext" @click="handleReply">
                            <Reply size="16" />
                        </button>
                        <div style="display: flex; flex-direction: row; gap: 8px">
                            <button class="main__inbox-button" title="Send Forward" @click="toggle($event)" :disabled="isWriteRoute">
                            <ChevronRight size="16" />
                            </button>
                            <Popover ref="op">
                                <div class="p-3" style="width: 22rem;">
                                    <h6 class="mb-3 fw-bold">Forward Message</h6>
                                    
                                    <div class="d-flex flex-column gap-3">
                                        <div>
                                            <label for="forward-email" class="form-label small text-muted">To (Email):</label>
                                            <input 
                                                id="forward-email" 
                                                v-model="forwardEmail" 
                                                placeholder="recipient@example.com" 
                                                class="w-100 p-2" 
                                                style="font-size: 0.9rem;"
                                            />
                                            <small v-if="forwardError" class="text-danger">{{ forwardError }}</small>
                                        </div>

                                        <div class="d-flex justify-content-end gap-2 mt-2">
                                            <button 
                                                class="btn btn-light"
                                                size="small" 
                                                @click="toggle" 
                                            >Cancel</button>
                                            <button 
                                                class="btn btn-dark"
                                                size="small" 
                                                :disabled="isForwarding"
                                                @click="handleForward" 
                                            >Send Forward</button>
                                        </div>
                                    </div>
                                </div>
                            </Popover>
                            <button class="main__inbox-button"  title="Download" :disabled="isWriteRoute || !currentMailContext" @click="handleDownload">
                            <ArrowDownToLine size="16" />
                            </button>
                            <button class="main__inbox-button"  title="Delete" :disabled="isWriteRoute || !currentMailContext" @click="handleDelete">
                            <Trash2 size="16" />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex-grow-1 overflow-auto px-2 px-lg-4 pb-4" style="min-height: 0;">
                    <slot/>
                </div>
            </div>
            
            <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1060;">
                <div ref="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">{{ toastTitle }}</strong>
                        <small>Now</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        {{ toastMessage }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import {Trash2, SquareSplitHorizontal, Reply, ChevronRight, ArrowDownToLine } from "lucide-vue-next";
import { handleSendEmail, handleDeleteEmail, GetCurrentUser } from "~~/lib/api";
import { onMounted, ref, computed, watch } from "vue";
import Sidebar from "../../Components/Sidebar.vue";
import { stripHtml } from "~~/lib/utils/helpers";
import { useRoute, useRouter } from "vue-router";
import Aside from "../../Components/Aside.vue";
import Popover from "primevue/popover";


const router = useRouter();
const route = useRoute();

const formattedRouteName = computed(() => {
    const name = (route.name || 'Inbox').toString();
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
});

const isSidebarVisible = ref(true); 

const handleShowHideSidebarAndAside = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
}

const isWriteRoute = computed(() => route.path === '/write');
const currentMailContext = useState('currentMailContext');
const globalToastState = useState('globalToastState', () => null);

const toastTitle = ref('Notification');
const isDeleting = ref(false);
const toastMessage = ref('');
const liveToast = ref(null);
let toastInstance = null;

watch(globalToastState, (newState) => {
    if (newState) {
        toastTitle.value = newState.title || 'New Message';
        toastMessage.value = newState.message || '';
        
        if (toastInstance) {
            toastInstance.show();
        }
        
        setTimeout(() => {
            globalToastState.value = null;
        }, 500);
    }
})

function toggle(event) {
op.value.toggle(event)
forwardEmail.value = ''
forwardError.value = ''
}

const op = ref(null)
const forwardEmail = ref('')
const isForwarding = ref(false)
const forwardError = ref('')


const handleForward = async () => {
    if (!currentMailContext.value) return;
    if (!forwardEmail.value.includes('@') || forwardEmail.value.length < 5) {
        forwardError.value = "Please enter a valid email address."
        return
    }

    isForwarding.value = true
    forwardError.value = ''

    try {
        const originalDate = new Date(currentMailContext.value.$createdAt).toLocaleString();
        const forwardHeader = `
            <br><br>
            <hr>
            <strong>---------- Forwarded message ----------</strong><br>
            <strong>From:</strong> ${currentMailContext.value.emailAuthor}<br>
            <strong>Date:</strong> ${originalDate}<br>
            <strong>Subject:</strong> ${currentMailContext.value.emailSubject}<br>
            <br>
        `;

        const newContent = forwardHeader + currentMailContext.value.emailText;

        const response = await handleSendEmail({
            to: forwardEmail.value,
            subject: `Fwd: ${currentMailContext.value.emailSubject}`,
            content: newContent
        });

        if (response.success) {
            op.value.hide(); 
            showToast('Message forwarded successfully!');
            forwardEmail.value = ''; 
        } else {
            forwardError.value = response.error || "Failed to send.";
        }

    } catch (e) {
        console.error(e)
        forwardError.value = "An unexpected error occurred."
    } finally {
        isForwarding.value = false
    }
}

const handleReply = () => {
    if (currentMailContext.value) {
        router.push({
            path: '/reply',
            query: {
                to: currentMailContext.value.emailAuthorEmail,
                subject: `Re: ${currentMailContext.value.emailSubject}`
            }
        })
    }
}

onMounted(async () => {
    const { Tooltip, Toast } = await import('bootstrap')

    if (window.innerWidth < 992) {
        isSidebarVisible.value = false;
    }

    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        new Tooltip(el)
    })

    toastInstance = new Toast(liveToast.value)
})

const handleDownload = () => {
    if (!currentMailContext.value) return;

    const mail = currentMailContext.value;
    
    const cleanBody = stripHtml(mail.emailText);
    const date = new Date(mail.$createdAt).toLocaleString();

    const fileContent = `Subject: ${mail.emailSubject}
From: ${mail.emailAuthor}
Date: ${date}
--------------------------------------------------

${cleanBody}`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const safeFilename = mail.emailSubject.replace(/[^a-z0-9a-żźćńółęąś\s-]/gi, '_').substring(0, 50);
    link.download = `${safeFilename}.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

const handleDelete = async () => {
    if (!currentMailContext.value) return;

    isDeleting.value = true;
    const user = await GetCurrentUser();

    const mailId = currentMailContext.value.$id;
    const myEmail = user.email;

    const response = await handleDeleteEmail(mailId, myEmail);
    isDeleting.value = false;

    if (response.success) {
        toastTitle.value = 'Success';
        toastMessage.value = 'Message deleted successfully.';
        
        if (toastInstance) toastInstance.show();

        setTimeout(() => {
            globalToastState.value = null;
        }, 500);

        currentMailContext.value = null;
        router.push('/home');

    } else {
        toastTitle.value = 'Error';
        toastMessage.value = 'An error occurred while deleting the message. Please try again later.';
        
        if (toastInstance) toastInstance.show();

        setTimeout(() => {
            globalToastState.value = null;
        }, 500);
    }
}

const closeSidebarOnMobile = () => {
    if (window.innerWidth < 992) {
        isSidebarVisible.value = false;
    }
}


</script>