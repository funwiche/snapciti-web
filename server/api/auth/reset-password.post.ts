import bcrypt from "bcrypt";
import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  try {
    const user = await User.findOne({ email });
    if (!user)
      throw createError({ statusCode: 404, message: "Email not found" });
    user.password = await bcrypt.hash(password, 12);
    await user.save();
    return { success: true };
  } catch (error) {
    returnError(error);
  }
});
