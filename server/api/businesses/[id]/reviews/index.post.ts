import Review from "~/server/models/Review";

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user._id;
    const business = getRouterParam(event, "id");
    const body = await readBody(event);
    const review = await Review.create({ ...body, user, business });
    await updateBusinessReviewStats(business as string);
    return review;
  } catch (error) {
    returnError(error);
  }
});
