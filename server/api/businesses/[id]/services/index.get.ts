import Service from "~/server/models/Service";

export default defineEventHandler(async (event) => {
  try {
    const business = getRouterParam(event, "id");
    return await Service.find({ business, active: true }).sort({
      createdAt: -1,
    });
  } catch (error) {
    returnError(error);
  }
});
