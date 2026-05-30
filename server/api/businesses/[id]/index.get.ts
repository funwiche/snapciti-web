import Business from "~/server/models/Business";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    return await Business.findById(id);
  } catch (error) {
    returnError(error);
  }
});
