import Service from "~/server/models/Service";
import Upload from "~/server/models/Upload";

export default defineEventHandler(async (event) => {
  try {
    const identifier = getRouterParam(event, "sid");
    await Service.findByIdAndDelete(identifier);
    await Upload.deleteMany({ identifier });
    return { success: true };
  } catch (error) {
    returnError(error);
  }
});
