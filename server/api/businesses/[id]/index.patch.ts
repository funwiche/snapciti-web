import Business from "~/server/models/Business";

export default defineEventHandler(async (event) => {
  try {
    const owner = event.context.user._id;
    const id = getRouterParam(event, "id") as string;
    let body = await readBody(event);
    const fd = await readMultipartFormData(event);
    if (!(await Business.findById(id)))
      return returnError({ message: "business_not_found" });
    if (fd?.length) {
      body = fd.find((el) => el.name == "body");
      if (body) {
        body = JSON.parse(body?.data.toString());
        body = formatBusinessHours(body);
        return await Business.findByIdAndUpdate(id, body, { new: true });
      }
      const image = fd.find((el) => el.name == "image");
      if (image) return await fileUpload(owner, id, "image", image.data);
      let logo = fd.find((el) => el.name == "logo");
      if (logo) return await fileUpload(owner, id, "logo", logo.data);
      let cover = fd.find((el) => el.name == "cover");
      if (cover) return await fileUpload(owner, id, "cover", cover.data);
    } else if (body) {
      body = formatBusinessHours(body);
      return await Business.findByIdAndUpdate(id, body, { new: true });
    } else return returnError({ message: "invalid_request" });
  } catch (error) {
    returnError(error);
  }
});
