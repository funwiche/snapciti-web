import Session from "~/server/models/Session";

export default defineEventHandler(async (event) => {
  try {
    const { _id: uid } = event.context.user;
    const accessToken = $crypto.generateToken();
    const token = $crypto.generateHash(accessToken);
    await Session.updateMany(
      { uid, revokedAt: null, expiresAt: { $gt: new Date() } },
      { revokedAt: new Date() },
    );
    await new Session({
      uid,
      token,
      userAgent: getHeader(event, "user-agent"),
      ipAddress: getRequestIP(event),
      expiresAt: new Date(Date.now() + 1000 * cookieOptions.maxAge),
    }).save();
    setCookie(event, "access_token", accessToken, cookieOptions);
    return { success: true };
  } catch (error) {
    returnError(error);
  }
});
