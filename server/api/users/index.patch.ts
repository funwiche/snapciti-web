import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const { _id } = event.context.user;
    const body = await readBody(event);
    const user = await User.findByIdAndUpdate(_id, body, { new: true });
    if (user) return await handleAuthUser(event, user);
  } catch (error) {
    returnError(error);
  }
});
