import Service from "~/server/models/Service";

export default defineEventHandler(async (event) => {
  try {
    return await Service.findById(getRouterParam(event, "sid"));
  } catch (error) {
    returnError(error);
  }
});
