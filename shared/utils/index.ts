import { filters } from "snaputils";
import { moments } from "snaputils";

export const $f = filters;
export const $m = moments;
export const capz = (input: any) => {
  if (typeof input != "string") return input;
  return input[0] ? input[0].toUpperCase() + input.slice(1) : "";
};
export function handleProvider(user: any) {
  return {
    id: user.uid,
    email: user.email || undefined,
    name: user.displayName || undefined,
    phone: user.phoneNumber || undefined,
    avatar: user.photoURL || undefined,
  };
}
export function $encode(data: any) {
  if (typeof data != "object") return data;
  return encodeURIComponent(JSON.stringify(data));
}
export function $decode(data: any) {
  if (typeof data != "string") return data;
  return JSON.parse(decodeURIComponent(data));
}
export const SOCIAL_PLATFORMS = [
  "facebook",
  "instagram",
  "x",
  "tiktok",
  "linkedin",
  "youtube",
  "telegram",
  "snapchat",
];
export function getLocalTIme(timeZone?: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}
