import Review from "~/server/models/Review";

export default defineEventHandler(async (event) => {
  try {
    const business = getRouterParam(event, "id");
    return await Review.find({ business }).sort({ createdAt: -1 });
  } catch (error) {
    returnError(error);
  }
});
