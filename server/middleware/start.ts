export default defineEventHandler((event) => {
  if (!getCookie(event, "device_id"))
    setCookie(event, "device_id", $f.uuid(), {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years persistence
      sameSite: "lax",
      httpOnly: true,
      path: "/",
    });
});
