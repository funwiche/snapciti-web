import Business from "~/server/models/Business";
import Upload from "~/server/models/Upload";
import Review from "~/server/models/Review";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    await Review.deleteMany({ business: id });
    await Upload.deleteMany({ identifier: id });
    await Business.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    returnError(error);
  }
});
