import { Client, Account, Databases } from "appwrite";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6920a7280035e278760c');

  const account = new Account(client);
  const databases = new Databases(client);

  return {
    provide: {
      appwrite: {
        client,
        account,
        databases
      }
    }
  };
});
