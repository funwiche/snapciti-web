import Session from "~/server/models/Session";
import Upload from "~/server/models/Upload";
import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const { _id } = event.context.user;
    await User.deleteOne({ _id });
    await Session.deleteMany({ uid: _id });
    await Upload.deleteOne({ uid: _id, field: "avatar" });
    deleteCookie(event, "access_token");
    deleteCookie(event, "auth_user");
    return { success: true };
  } catch (error) {
    returnError(error);
  }
});
