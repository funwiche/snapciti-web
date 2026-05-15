export const useAuthUser = () =>
  useState<Record<string, any> | null>("auth-user", () => null);
export const useAuthStatus = () =>
  useState<boolean>("auth-status", () => {
    return false;
  });
