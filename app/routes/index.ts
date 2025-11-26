export default defineEventHandler(async (event) => {
  if (event.context.user) {
    await sendRedirect(event, "/home");
  }

  await sendRedirect(event, "/sign-in");
});
