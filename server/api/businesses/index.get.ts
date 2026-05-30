import Business from "~/server/models/Business";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 12);
    return await Business.find({ disabled: false })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
  } catch (error) {
    returnError(error);
  }
});
