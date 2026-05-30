export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const token = $cookie.get("access_token");
    const auth_user = $cookie.get("auth_user");
    const { auth_modal, user } = useAppState();
    const is_protected = to.name?.toString().startsWith("account");

    // If we are on the server and have a cookie, we are logged in
    if (import.meta.server && token) {
      user.value = $decode(auth_user);
      const res = await $fetch("/api/auth/session", {
        method: "POST",
        body: { token },
      });
      if (res) return;
      user.value = null;
      if (is_protected) return navigateTo($path({ name: "auth" }));
    }

    // Guest logic
    if (to.name?.toString().startsWith("auth")) {
      if (!user.value) return;
      if (from.name?.toString().startsWith("auth") || import.meta.server)
        return navigateTo($path({ name: "account" }));
      return abortNavigation();
    }

    // Protected route logic
    if (is_protected) {
      if (user.value) return;
      $cookie.set("redirect", to.fullPath);
      if (from.name?.toString().startsWith("account") || import.meta.server)
        return navigateTo($path({ name: "auth" }));
      auth_modal.value = true;
      return abortNavigation();
    }
  } catch (error) {
    console.error(handleError(error));
  }
});
