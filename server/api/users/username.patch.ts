import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    let user = event.context.user;
    const { username } = await readBody(event);
    if (user.username != username) {
      if (await User.findOne({ username }))
        throw createError({
          statusCode: 400,
          message: "username_not_available",
        });
      user = await User.findByIdAndUpdate(
        user._id,
        { username },
        { new: true },
      );
    }
    if (user) return await handleAuthUser(event, user);
  } catch (error) {
    returnError(error);
  }
});
