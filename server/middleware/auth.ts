import User from "../models/User";
import Session from "../models/Session";

export default defineEventHandler(async (event) => {
  // Protected routes
  const isProtected =
    event.path.startsWith("/api/users") ||
    event.path.startsWith("/api/admin") ||
    event.path.startsWith("/api/reviews") ||
    event.path.startsWith("/api/auth/link") ||
    (event.path.startsWith("/api/businesses") && event.method != "GET");
  try {
    if (isProtected) {
      const authHeader = getHeader(event, "authorization");
      const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;
      const cookieToken = getCookie(event, "access_token");
      const sessionToken = cookieToken ? cookieToken : bearerToken;
      if (!sessionToken)
        throw createError({
          statusCode: 401,
          statusMessage: "invalid_credential",
        });
      const token = $crypto.generateHash(sessionToken);
      const session = await Session.findOne({
        token,
        revokedAt: null,
        expiresAt: { $gt: new Date() },
      });

      if (!session)
        throw createError({
          statusCode: 401,
          statusMessage: "invalid_session",
        });

      const user = await User.findById(session.uid);
      if (!user || user.disabled)
        throw createError({ statusCode: 403, statusMessage: "invalid_user" });

      // Attach to request context
      event.context.user = user;
      event.context.session = session;
    }
  } catch (error: any) {
    deleteCookie(event, "access_token");
    if (error && typeof error === "object" && "statusCode" in error)
      throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      fatal: false,
    });
  }
});
