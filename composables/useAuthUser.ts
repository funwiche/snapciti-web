export const useAuthUser = () =>
  useState<Record<string, any> | null>("auth-user", () => null);
