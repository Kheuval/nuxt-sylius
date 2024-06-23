export const useAuth = () => {
  const { syncSession, shouldRedirectToLogin } = useUserSession();

  const registerFormData = ref<{
    firstName: string;
    lastName: string;
    email: string;
    passwordFirst: string;
    passwordSecond: string;
    subscribedToNewsletter?: boolean;
  }>();

  const { execute: executeRegister, error: registerError } = useFetch(
    "/api/auth/register",
    {
      method: "POST",
      body: registerFormData,
      immediate: false,
      watch: false,
    },
  );

  useFormErrors(registerError);

  const register = async () => {
    await executeRegister();

    if (registerError.value) {
      return;
    }

    loginFormData.value = {
      email: registerFormData.value!.email,
      password: registerFormData.value!.passwordFirst,
    };

    await executeLogin();
    await syncSession();
  };

  const loginFormData = ref<{
    email: string;
    password: string;
    rememberMe?: boolean;
  }>();

  const { execute: executeLogin, error: loginError } = useFetch(
    "/api/auth/login",
    {
      method: "POST",
      body: loginFormData,
      immediate: false,
      watch: false,
    },
  );

  useFormErrors(loginError);

  const login = async () => {
    await executeLogin();

    if (loginError.value) {
      return;
    }

    await syncSession();
  };

  const { execute: executeLogout } = useFetch("/api/auth/logout", {
    method: "POST",
    immediate: false,
  });

  const logout = async () => {
    await executeLogout();
    await syncSession();

    return navigateTo("/");
  };

  const {
    data: user,
    execute: executeGetUser,
    error: getUserError,
  } = useFetch("/api/auth/user", { immediate: false });

  const getUser = async () => {
    await executeGetUser();
    await shouldRedirectToLogin();
  };

  return {
    register,
    registerError,
    registerFormData,
    login,
    loginError,
    loginFormData,
    logout,
    getUser,
    getUserError,
    user,
  };
};
