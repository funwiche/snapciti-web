import bcrypt from "bcrypt";
import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const { _id } = event.context.user;
    let { password } = await readBody(event);
    if (!password || !$f.validate.password(password))
      throw createError({ statusCode: 400, message: "invalid_passord" });
    password = await bcrypt.hash(password, 12);
    await User.updateOne({ _id }, { password });
    return { success: true };
  } catch (error) {
    returnError(error);
  }
});
