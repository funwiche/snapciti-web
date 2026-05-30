import bcrypt from "bcrypt";
import Session from "~/server/models/Session";
import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  let { _id: uid, ...user } = event.context.user;

  try {
    let { password, newpassword } = await readBody(event);
    if (!newpassword || !$f.validate.password(newpassword))
      throw createError({ statusCode: 400, message: "invalid_passord" });
    if (!(await bcrypt.compare(password, user.password)))
      throw createError({ statusCode: 401, message: "incorrect_password" });
    password = await bcrypt.hash(newpassword, 12);
    user = await User.findByIdAndUpdate(uid, { password }, { new: true });
    await Session.updateMany(
      { uid, revokedAt: null, expiresAt: { $gt: new Date() } },
      { revokedAt: new Date() },
    );
    if (user) return await handleAuthUser(event, user);
  } catch (error) {
    returnError(error);
  }
});
