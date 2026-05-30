import Service from "~/server/models/Service";

export default defineEventHandler(async (event) => {
  try {
    const _id = $crypto.generateObjectId();
    const user = event.context.user._id;
    const business = getRouterParam(event, "id");
    let body = await readBody(event);
    const fd = await readMultipartFormData(event);
    if (fd?.length) {
      body = fd.find((el) => el.name == "body");
      if (!body) return returnError({ message: "invalid_request" });
      body = JSON.parse(body?.data.toString());
      const slug = generateSlug(body.name);
      await Service.create({ _id, ...body, slug, user });
      const image = fd.find((el) => el.name == "image");
      if (image) await fileUpload(user, _id, "service", image.data);
      return await Service.findById(_id);
    } else if (body) {
      const slug = generateSlug(body.name);
      return await Service.create({ ...body, slug, user, business });
    } else return returnError({ message: "invalid_request" });
  } catch (error) {
    returnError(error);
  }
});
