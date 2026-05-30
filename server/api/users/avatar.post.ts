import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const { _id: uid } = event.context.user;
    const files = await readMultipartFormData(event);
    if (!files?.length) return returnError({ message: "no_file_uploaded" });
    const file = files[0];
    if (!file) return returnError({ message: "invalid_file" });
    const user: any = await fileUpload(uid, uid, "avatar", file);
    if (user) return await handleAuthUser(event, user);
  } catch (error) {
    console.error(error);
    returnError(error);
  }
});
