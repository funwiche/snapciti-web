import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const { email, phone }: any = getQuery(event);
  try {
    let result;
    if (phone) result = await User.findOne({ phone });
    else if (email) result = await User.findOne({ email });
    return result;
  } catch (error: any) {
    return returnError(error);
  }
});
