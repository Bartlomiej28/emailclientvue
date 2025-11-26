import { Client, Account, Databases } from 'appwrite';

export const SESSION_COOKIE = "my-custom-session";
export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6920a7280035e278760c'); 
    
    
export const account = new Account(client);
export const databases = new Databases(client);

export function createSessionClient(event) {
  const config = useRuntimeConfig(event);

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6920a7280035e278760c');

  const session = getCookie(event, SESSION_COOKIE);
  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
  };
}