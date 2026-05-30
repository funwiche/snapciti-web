export function handleError(error: any) {
  return error?.code || error.data?.message || error?.message;
}
export async function setCurrentUser(currentUser: IUser | null) {
  try {
    const { auth_modal, user } = useAppState();
    const redirect = $cookie.get("redirect");
    const { fullPath } = useRoute();
    user.value = currentUser;
    $cookie.delete("redirect");
    if (redirect && redirect == fullPath) return (auth_modal.value = false);
    navigateTo(redirect || $path({ name: "account" }));
  } catch (error) {
    throw error;
  }
}
export const $cookie = {
  get: (name: string) => useCookie(name).value,
  set: (name: string, value: any) => (useCookie(name).value = value),
  delete: (name: string) =>
    (useCookie(name, { expires: new Date("2000-01-01") }).value = null),
};

export function $asset(filename: string): string {
  const exceptions = [
    "/",
    "http:",
    "https:",
    "ftp:",
    "mailto:",
    "tel:",
    "sms:",
    "file:",
    "data:",
    "geo:",
    "ws:",
    "wss:",
    "javascript:",
    "blob:",
  ];
  if (!filename) return filename;
  for (const el of exceptions) if (filename?.startsWith(el)) return filename;
  return `/assets/image/${filename}`;
}
export const $links = {
  help: [
    {
      icon: "user",
      title: "account-management",
      path: "/help/account-management",
      desc: "account-management-desc",
    },
    {
      icon: "edit",
      title: "create_edit",
      path: "/help/create_edit",
      desc: "create_edit-desc",
    },
    {
      icon: "folder-magnifying-glass",
      title: "find_save",
      path: "/help/find_save",
      desc: "find_save-desc",
    },
    {
      icon: "shopping-cart",
      title: "buying_selling",
      path: "/help/buying",
      desc: "buying_selling-desc",
    },
    {
      icon: "reviews",
      title: "ratings_reviews",
      path: "/help/ratings_reviews",
      desc: "ratings_reviews-desc",
    },
    {
      icon: "bullhorn",
      title: "advertise",
      path: "/help/advertise",
      desc: "advertise-desc",
    },
  ],
  policies: [
    {
      title: "privacy-policy",
      path: "/policies/privacy",
      icon: "privacy",
      desc: "privacy-policy-desc",
    },
    {
      title: "terms-of-service",
      path: "/policies/terms",
      icon: "terms",
      desc: "terms-of-service-desc",
    },
    {
      title: "cookies-policy",
      path: "/policies/cookies",
      icon: "cookies",
      desc: "cookies-policy-desc",
    },
    {
      title: "community-guidelines",
      path: "/policies/guidelines",
      icon: "guidelines",
      desc: "community-guidelines-desc",
    },
    {
      title: "review-guidelines",
      path: "/policies/reviews",
      icon: "reviews",
      desc: "review-guidelines-desc",
    },
  ],
  settings: [
    {
      path: "/account",
      title: "account-settings",
      desc: "account-settings-desc",
    },
    {
      path: "/settings/language",
      title: "language",
      desc: "language-settings-desc",
    },
    {
      path: "/settings/location",
      title: "location",
      desc: "location-settings-desc",
    },
    {
      path: "/settings/appearance",
      name: "appearance",
      desc: "appearance-settings-desc",
    },
    {
      path: "/settings/history",
      title: "search-history",
      desc: "search-history-desc",
    },
    {
      path: "/settings/privacy",
      title: "privacy_cookies",
      desc: "privacy_cookies-desc",
    },
  ],
  account: [
    {
      title: "edit-profile",
      path: "/account/profile",
      desc: "edit-profile-desc",
      icon: "manage_account",
    },
    {
      title: "username",
      path: "/account/username",
      desc: "username-settings-desc",
      icon: "username",
    },
    {
      title: "email-address",
      path: "/account/email",
      desc: "email-settings-desc",
      icon: "email",
    },
    {
      title: "phone-number",
      path: "/account/phone",
      desc: "phone-settings-desc",
      icon: "phone",
    },
    {
      title: "password",
      path: "/account/password",
      desc: "password-settings-desc",
      icon: "password",
    },
    {
      title: "address",
      path: "/account/address",
      desc: "address-settings-desc",
      icon: "address",
    },
    {
      path: "/account/notifications",
      title: "notifications",
      desc: "notification-settings-desc",
    },
    {
      title: "deactivate-your-account",
      path: "/account/deactivate",
      desc: "deactivate-your-account-desc",
      icon: "deactivate",
    },
  ],
};
