import crypto from "crypto";
import type { H3Event } from "#imports";
import Session from "~/server/models/Session";
import User from "../models/User";
import Business from "../models/Business";
import { DateTime } from "luxon";

export function returnError(error: any) {
  if (error.code == "auth/user-not-found") return null;
  throw createError({ message: error.code || error.message });
}
function removeDiacritics(name: string): string {
  return name
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/œ/g, "oe")
    .replace(/ß/g, "ss")
    .replace(/ø/g, "o")
    .replace(/ł/g, "l")
    .replace(/đ/g, "d")
    .replace(/ħ/g, "h")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]+/g, "")
    .replace(/ +/g, " ")
    .trim();
}
export async function generateUserName(input: string): Promise<string> {
  let username = removeDiacritics(input);
  if (!username) return `user.${crypto.randomInt(1111, 9999)}`;
  username = username.replaceAll(" ", "");
  if (!(await User.findOne({ username }))) return username;
  return `${username}${crypto.randomInt(10, 100)}`;
}
export async function generatePublicUrl(input: string): Promise<string> {
  let slug = removeDiacritics(input);
  if (!slug) return `biz.${crypto.randomInt(1111, 9999)}`;
  slug = slug.replaceAll(" ", "");
  if (!(await Business.findOne({ slug }))) return slug;
  return `${slug}${crypto.randomInt(10, 100)}`;
}
export function generateSlug(input: string): string {
  let uname = removeDiacritics(input);
  if (!uname) return `item-${Date.now()}`;
  return `${uname.replaceAll(" ", "-")}-${Date.now()}`;
}
export const $crypto = {
  generateUUID: () => crypto.randomUUID(),
  generateObjectId: () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomValue = crypto.randomBytes(5).toString("hex");
    const counter = crypto.randomBytes(3).toString("hex");
    return `${timestamp.padStart(8, "0")}${randomValue}${counter}`;
  },
  generateApiKey: () => crypto.randomBytes(24).toString("hex"),
  generateToken: () => crypto.randomBytes(64).toString("hex"),
  generateHash: (token: string) =>
    crypto.createHash("sha256").update(token).digest("hex"),
};
export const cookieOptions: ICookieOption = {
  // Set session expiration to 30 days
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 30,
  sameSite: "lax",
  httpOnly: true,
  path: "/",
};
export async function handleAuthUser(event: H3Event, user: IUser) {
  const accessToken = $crypto.generateToken();
  const sessionToken = getCookie(event, "access_token");

  try {
    if (sessionToken) await $fetch("/api/auth/logout", { method: "POST" });
    await Session.create({
      uid: user.id,
      token: $crypto.generateHash(accessToken),
      ipAddress: getRequestIP(event),
      userAgent: getHeader(event, "user-agent"),
      expiresAt: new Date(Date.now() + 1000 * cookieOptions.maxAge),
    });
    setCookie(event, "access_token", accessToken, cookieOptions);
    setCookie(event, "auth_user", $encode(user), cookieOptions);
    return { user, accessToken };
  } catch (error) {
    throw error;
  }
}
export async function FilterBusiness(timeZone: string) {
  const now = new Date();
  const dayOfWeek = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
  })
    .format(now)
    .replace(".", "")
    .toLowerCase();
  const currentTime = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  return await Business.find({
    $or: [
      // Case A: The day is set to "open_24_hours"
      { [`hours.${dayOfWeek}`]: "open_24_hours" },
      // Case B: Current time falls within one of the open/close intervals
      {
        [`hours.${dayOfWeek}`]: {
          $elemMatch: {
            opens: { $lte: currentTime },
            closes: { $gte: currentTime },
          },
        },
      },
    ],
  });
}
export async function FilterOpenBusinessesGlobally() {
  const now = new Date();
  // 1. Get current UTC day code (mon, tue, wed...)
  const rawDay = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "short",
  }).format(now);
  const currentUtcDay = rawDay.replace(".", "").toLowerCase();
  // 2. Get current UTC minutes since midnight (0 - 1439)
  const currentUtcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  // 3. Query using highly-indexable numeric values
  return await Business.find({
    $or: [
      { [`hours.${currentUtcDay}`]: "open_24_hours" },
      {
        [`hours.${currentUtcDay}`]: {
          $elemMatch: {
            opensUtc: { $lte: currentUtcMinutes },
            closesUtc: { $gte: currentUtcMinutes },
          },
        },
      },
    ],
  });
}
export function formatBusinessHours(body: any) {
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  for (const day of days) {
    const dayData = body.hours?.[day];
    if (Array.isArray(dayData)) {
      body.hours[day] = dayData.map(({ opens, closes }) => {
        const [openH, openM] = opens.split(":").map(Number);
        const [closeH, closeM] = closes.split(":").map(Number);
        // 1. Create a fake date in the business's local timezone
        let localOpen = DateTime.local()
          .setZone(body.address.timezone)
          .set({ hour: openH, minute: openM });
        let localClose = DateTime.local()
          .setZone(body.address.timezone)
          .set({ hour: closeH, minute: closeM });
        // 2. Convert that exact moment to UTC
        const utcOpen = localOpen.toJSDate();
        const utcClose = localClose.toJSDate();
        // 3. Calculate absolute minutes since midnight UTC
        const opensUtc = utcOpen.getUTCHours() * 60 + utcOpen.getUTCMinutes();
        const closesUtc =
          utcClose.getUTCHours() * 60 + utcClose.getUTCMinutes();

        return { opens, closes, opensUtc, closesUtc };
      });
    }
  }
  return body;
}
