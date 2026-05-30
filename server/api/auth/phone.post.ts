import User from "~/server/models/User";
export default defineEventHandler(async (event) => {
  try {
    const { phone, ...body } = await readBody(event);
    let user = await User.findOne({ phone });
    if (!user) {
      const username = await generateUserName(body.name);
      user = new User({ ...body, phone, username });
    }
    user.lastLogin = new Date();
    await user.save();
    return await handleAuthUser(event, user);
  } catch (error) {
    returnError(error);
  }
});
