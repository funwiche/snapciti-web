import User from "~/server/models/User";
export default defineEventHandler(async (event) => {
  try {
    const body = handleProvider(await readBody(event));
    let user = await User.findOne({
      $or: [{ email: body.email }, { "providers.google.id": body.id }],
    });
    if (!user) {
      const username = await generateUserName(body.name);
      user = new User({ ...body, verified: true, username });
    }
    user.providers.google = body;
    user.lastLogin = new Date();
    await user.save();
    return await handleAuthUser(event, user);
  } catch (error) {
    returnError(error);
  }
});
