export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useUserSession();

  if (isLoggedIn.value && to.path.includes("/login")) {
    return abortNavigation();
  }

  if (!isLoggedIn.value && !to.path.includes("/login")) {
    const localePath = useLocalePath();

    return navigateTo({
      path: localePath("/login"),
      query: { referer: to.path },
    });
  }
});
