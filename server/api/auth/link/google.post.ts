import User from "~/server/models/User";
export default defineEventHandler(async (event) => {
  try {
    const { _id } = event.context.user;
    const body = handleProvider(await readBody(event));
    let user = await User.findOne({
      $or: [{ email: body.email }, { "providers.google.id": body.id }],
    });
    if (user)
      throw createError({ statusCode: 400, message: "email_already_exist" });
    user = await User.findByIdAndUpdate(
      _id,
      { "providers.google": body },
      { new: true },
    );
    if (user) return await handleAuthUser(event, user);
  } catch (error) {
    returnError(error);
  }
});
