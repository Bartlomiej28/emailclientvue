import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
    modules: [
        '@primevue/nuxt-module',
    ],
    primevue: {
    options: {
        theme: {
            preset: Aura,
            cssLayer: {
                name: "primevue",
                order: "primevue, bootstrap"
            }
        }
    }
},
runtimeConfig: {
    public: {
        appwriteEndpoint: process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT,
        appwriteProjectId: process.env.NUXT_PUBLIC_APPWRITE_PROJECT_ID,
        appwriteDatabaseId: process.env.NUXT_PUBLIC_APPWRITE_DATABASE_ID,
        appwriteUsersCollectionId: process.env.NUXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        appwriteEmailsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_EMAILS_COLLECTION_ID
    }
  }

})
