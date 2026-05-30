import bcrypt from "bcrypt";
import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let { email, password } = body;
    const user = await User.findOne({ email });
    if (!user)
      throw createError({ statusCode: 404, message: "email_not_found" });
    if (!(await bcrypt.compare(password, user.password)))
      throw createError({ statusCode: 401, message: "incorrect_password" });
    user.lastLogin = new Date();
    await user.save();
    return await handleAuthUser(event, user);
  } catch (error) {
    returnError(error);
  }
});
