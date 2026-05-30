import Session from "~/server/models/Session";

export default defineEventHandler(async (event) => {
  try {
    const sessionToken = getCookie(event, "access_token");
    if (sessionToken) {
      const token = $crypto.generateHash(sessionToken);
      await Session.updateOne({ token }, { revokedAt: new Date() });
    }
    deleteCookie(event, "auth_user");
    deleteCookie(event, "access_token");
    return { success: true };
  } catch (error: any) {
    returnError(error);
  }
});
