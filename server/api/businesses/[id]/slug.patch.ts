import Business from "~/server/models/Business";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const { slug } = await readBody(event);
    const biz = await Business.findById(id);
    if (!biz) return returnError({ message: "biz_not_found" });
    if (biz.slug == slug || (await Business.findOne({ slug })))
      return returnError({ message: "username_not_available" });
    biz.slug = slug;
    biz.save();
    return biz;
  } catch (error) {
    returnError(error);
  }
});
