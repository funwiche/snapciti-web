import Review from "~/server/models/Review";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const review = await Review.findById(id);
    if (!review) return returnError({ message: "review_not_found" });
    await Review.findByIdAndDelete(id);
    await updateBusinessReviewStats(review.business.toString());
    return { success: true };
  } catch (error) {
    returnError(error);
  }
});
