import Service from "~/server/models/Service";

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user._id;
    const sid = getRouterParam(event, "sid") as string;
    let body = await readBody(event);
    const fd = await readMultipartFormData(event);
    if (!(await Service.findById(sid)))
      return returnError({ message: "service_not_found" });
    if (fd?.length) {
      body = fd.find((el) => el.name == "body");
      if (body) {
        body = JSON.parse(body?.data.toString());
        return await Service.findByIdAndUpdate(sid, body, { new: true });
      }
      const image = fd.find((el) => el.name == "image");
      if (image) return await fileUpload(user, sid, "service", image.data);
    } else if (body) {
      return await Service.findByIdAndUpdate(sid, body, {
        new: true,
        runValidators: true,
      });
    } else returnError({ message: "invalid_request" });
  } catch (error) {
    returnError(error);
  }
});
