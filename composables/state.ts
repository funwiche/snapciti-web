export function useAppState() {
  /// devices width
  const width = ref(0);
  /// auth modal
  const auth_modal = useState("auth-modal", () => false);
  const place_modal = useState("place-modal", () => false);
  /// auth user
  const user = useState<IUser | null>("auth-user", () => null);
  // if (import.meta.client)
  //   onMounted(() => {
  //     width.value = innerWidth;
  //     window.addEventListener("resize", () => (width.value = innerWidth));
  //   });
  return { width, auth_modal, place_modal, user };
}
