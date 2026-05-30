import User from "~/server/models/User";
export default defineEventHandler(async (event) => {
  try {
    const { _id } = event.context.user;
    const { phone } = await readBody(event);
    let user = await User.findOne({ phone });
    if (user)
      throw createError({
        statusCode: 400,
        message: "Phone number already in use",
      });
    user = await User.findByIdAndUpdate(_id, { phone }, { new: true });
    if (user) return await handleAuthUser(event, user);
  } catch (error) {
    returnError(error);
  }
});
