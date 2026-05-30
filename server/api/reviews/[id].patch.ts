import Review from "~/server/models/Review";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const review = await Review.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!review) return returnError({ message: "review_not_found" });
    await updateBusinessReviewStats(review.business.toString());
    return review;
  } catch (error) {
    returnError(error);
  }
});
