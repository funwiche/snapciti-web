import Session from "~/server/models/Session";

export default defineEventHandler(async (event) => {
  try {
    const { token } = await readBody(event);
    if (!token)
      throw createError({
        statusCode: 401,
        statusMessage: "invalid-credential",
      });
    return await Session.findOne({
      token: $crypto.generateHash(token),
      expiresAt: { $gt: new Date() },
      revokedAt: null,
    });
  } catch (error: any) {
    returnError(error);
  }
});
