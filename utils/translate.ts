import locales from "@/resources/locales.json";
import type { RouteRecordName } from "vue-router";

export function tn(value: any, count = 0, slot: any = {}) {
  const { locale } = useI18n();
  if (!value) return "";
  let res = (locales as any)?.[value]?.[locale.value];
  if (!res) return `**${value}`;
  if (Array.isArray(res)) res = count == 1 ? res[0] : res[1];
  res = res.replace(
    /\$\{(.*?)\}/g,
    (_: any, attr: any) => ({ ...slot, count })[attr] || "",
  );
  return $f.capz(res);
}
type RouteLocationRaw = {
  name?: RouteRecordName;
  path?: string;
  params?: Record<string, any>;
  query?: Record<string, any>;
  hash?: string;
};

export function $path(route: RouteLocationRaw | string): string {
  return useLocalePath()(route);
}
export const $routeName = () => useRouteBaseName()(useRoute());
