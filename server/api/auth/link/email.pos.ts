import User from "~/server/models/User";
export default defineEventHandler(async (event) => {
  try {
    const { _id } = event.context.user;
    const { email } = await readBody(event);
    let user = await User.findOne({
      $or: [
        { email },
        { "providers.google.email": email },
        { "providers.facebook.email": email },
      ],
    });
    if (user)
      throw createError({ statusCode: 400, message: "email_already_exist" });
    user = await User.findByIdAndUpdate(_id, { email }, { new: true });
    if (user) return await handleAuthUser(event, user);
  } catch (error) {
    returnError(error);
  }
});
