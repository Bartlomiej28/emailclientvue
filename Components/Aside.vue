<template>
    <aside class="main__aside">
        <div class="main__aside-header">
          <div class="d-flex justify-content-between align-items-center">
              <span>Inbox</span>
              <div class="form-check form-switch">
                <label class="form-check-label" for="unreads">
                  Unreads
                </label>
                <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="unreads" 
                    role="switch"
                    v-model="showUnreadsOnly" 
                >
              </div>
          </div>
          
          <input 
            type="text" 
            class="main__aside-input" 
            placeholder="Type to search..." 
            name="search-emails"
            v-model="searchQuery"
            @input="onSearchInput"
          />
        </div>

        <div class="main__aside-mails">
          <div v-if="isLoading">
            <EmailsSkeleton/>
          </div>

          <div v-else>
             <div v-if="displayedMails.length === 0" class="p-4 text-center text-muted">
                Brak wyników.
             </div>

             <div v-for="mail in displayedMails" :key="mail.$id">
                <RouterLink 
                    class="main__aside-mail_shortcut" 
                    :class="{ 'unread': !mail.isRead }" 
                    :to="`/email/${mail.$id}`"
                    @click="handleClick"
                >
                    <div class="main__aside-mail_shortcut-header">
                        <span :style="!mail.isRead ? 'font-weight: 700' : ''">{{ mail.emailAuthor }}</span>
                        <div>
                          <span class="m-2">{{ formatDate(mail.$createdAt) }}</span>
                          <Tag v-if="isRecent(mail.$createdAt)" value="New" severity="success"></Tag>
                        </div>
                        
                    </div>
                    
                    <div class="main__aside-mail_shortcut-title">
                        {{ mail.emailSubject }}
                    </div>
                    
                    <div class="main__aside-mail_shortcut-text">
                        {{ stripHtml(mail.emailText) }}
                    </div>
                </RouterLink>
            </div>
          </div>
          
        </div>

      </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { handleGetEmails, handleSearch } from "~~/lib/api";
import EmailsSkeleton from "./EmailsSkeleton.vue";
import { client } from "~~/lib/utils/appwrite";
import { stripHtml } from "~~/lib/utils/helpers";
import Tag from "primevue/tag";
import { GetCurrentUser } from "~~/lib/api";

const globalToastState = useState('globalToastState');
const emit = defineEmits(['close-sidebar']);

const handleClick = () => {
    emit('close-sidebar');
}

const currentUser = ref(null);
const currentEmail = computed(() => currentUser.value?.email ?? null);

const isLoading = ref(true);
const searchQuery = ref('');
const mails = ref([]);

const showUnreadsOnly = ref(false);
let searchTimeout = null;
let unsubscribe = null;

const displayedMails = computed(() => {
    if (showUnreadsOnly.value) return mails.value.filter(mail => mail.isRead === false);
    return mails.value;
});

const extractDocuments = (response) => {
    if (response && response.documents) return response.documents;
    if (Array.isArray(response)) return response;
    return [];
}

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    return isToday 
        ? Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date)
        : Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);

   
}

const isRecent = (dateString) => {
    if (!dateString) return false;
    const emailDate = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diffInMs = now - emailDate;
    const fourHoursInMs = 4 * 60 * 60 * 1000; 
    return diffInMs < fourHoursInMs;
}

const setupRealtimeSubscription = (userEmail) => {
    
    const DATABASE_ID = '6920af6c0015cd20be3e'; 
    const COLLECTION_ID = 'emails';             

    unsubscribe = client.subscribe(
        `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`, 
        (response) => {
            const event = response.events[0]; 
            const payload = response.payload; 

            if (event.includes('.create')) {
                if (payload.emailTo === userEmail) {
                    mails.value.unshift(payload);
                    
                    globalToastState.value = {
                        title: payload.emailAuthor,
                        message: payload.emailSubject
                    };
                }
            }

            if (event.includes('.update')) {
                const index = mails.value.findIndex(m => m.$id === payload.$id);
                if (index !== -1) mails.value[index] = payload;
                
            }

            if (event.includes('.update')) {
                const index = mails.value.findIndex(m => m.$id === payload.$id);
                if (index !== -1) {
                    if (payload.emailTo === userEmail && payload.visibleToRecipient === false) mails.value.splice(index, 1); 
                    else mails.value[index] = payload;
                    
                }else {
                    if (payload.emailTo === userEmail && payload.visibleToRecipient === true) {
                        mails.value.push(payload);
                        mails.value.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
                    }
                }
            }
        }
    );
}

onMounted(async () => {
     isLoading.value = true;

    
    const user = await GetCurrentUser();
    
    if (!user || !user.email) {
        console.error("User not logged in or missing email");
        isLoading.value = false;
        return;
    }
    const userEmail = user.email;

    try {
        isLoading.value = true
        const response = await handleGetEmails({ userEmail });
        mails.value = extractDocuments(response);
        setupRealtimeSubscription(userEmail);
    } catch (error) {
        console.error(error)
        mails.value = [];
    } finally {
        isLoading.value = false
    }
})

onUnmounted(() => {
    if (unsubscribe) unsubscribe();
})

const onSearchInput = () => {
    if (searchTimeout) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
        const query = searchQuery.value.trim();
        isLoading.value = true; 

        try {
            let response;
            if (query.length === 0) response = await handleGetEmails({ userEmail: currentEmail.value });
            else if (query.length > 2) response = await handleSearch(query);
            else {
                isLoading.value = false;
                return; 
            }
            
            mails.value = extractDocuments(response);

        } catch (error) {
            console.error("Błąd szukania:", error);
            mails.value = [];
        } finally {
            isLoading.value = false; 
        }
        
    }, 500);
}






</script>