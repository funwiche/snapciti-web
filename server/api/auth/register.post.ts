import User from "~/server/models/User";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let { email, name, password } = body;
    // 1. Ensure this email address isn't claimed globally or as an email identity
    const emailTaken = await User.findOne({ email });
    if (emailTaken)
      throw createError({ statusCode: 400, message: "email_already_exist" });
    // 2. Hash security password credentials
    password = await bcrypt.hash(password, 12);
    const username = await generateUserName(name);
    const user = await new User({ ...body, username, password }).save();
    return await handleAuthUser(event, user);
  } catch (error) {
    returnError(error);
  }
});

// "providers.email": { id: email, email },
