import Business from "~/server/models/Business";

export default defineEventHandler(async (event) => {
  try {
    const _id = $crypto.generateObjectId();
    const owner = event.context.user._id;
    let body = await readBody(event);
    const fd = await readMultipartFormData(event);
    if (fd?.length) {
      body = fd.find((el) => el.name == "body");
      if (!body) return returnError({ message: "invalid_request" });
      body = JSON.parse(body?.data.toString());
      body = formatBusinessHours(body);
      const slug = await generatePublicUrl(body.name);
      await Business.create({ _id, ...body, slug, owner });
      const images = fd.filter((el) => el.name == "image");
      if (images.length)
        for (const { data } of images)
          await fileUpload(owner, _id, "image", data);
      let logo = fd.find((el) => el.name == "logo");
      if (logo) await fileUpload(owner, _id, "logo", logo.data);
      let cover = fd.find((el) => el.name == "cover");
      if (cover) await fileUpload(owner, _id, "cover", cover.data);
    } else if (body) {
      body = formatBusinessHours(body);
      const { images, ...rest } = body;
      const slug = await generatePublicUrl(body.name);
      await Business.create({ _id, ...rest, slug, owner });
      for (const image of images) await fileUpload(owner, _id, "image", image);
    } else return returnError({ message: "invalid_request" });
    // return await Business.findById(_id);
  } catch (error) {
    returnError(error);
  }
});
