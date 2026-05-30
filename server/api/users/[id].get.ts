import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    return await User.findById(getRouterParam(event, "id"));
  } catch (error) {
    returnError(error);
  }
});
