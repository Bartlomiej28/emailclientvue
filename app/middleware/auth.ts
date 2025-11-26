import { GetCurrentUser } from '~~/lib/api';

export default defineNuxtRouteMiddleware(async (to, from) => {
 if (process.server) return; 

  const publicPages = ['/sign-in', '/sign-up', '/'];
  
  if (publicPages.includes(to.path)) {
      return;
  }
  
  const user = await GetCurrentUser();
  if (!user) {
    return navigateTo('/sign-in');
  }
});