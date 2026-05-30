import sharp from "sharp";
import { randomUUID } from "crypto";
import Upload from "~/server/models/Upload";
import Business from "../models/Business";
import User from "../models/User";
import Service from "../models/Service";
export default async function (
  uid: string,
  identifier: string,
  field: string,
  file: any,
) {
  let buffer;
  const filename = `${randomUUID()}.webp`;
  try {
    if (typeof file == "string") {
      const responseType = "arrayBuffer";
      const arrayBuffer: any = await $fetch(file, { responseType });
      buffer = Buffer.from(arrayBuffer);
    } else buffer = file.data;
    if (["avatar", "logo", "cover", "service"].includes(field))
      await Upload.deleteOne({ identifier, field });

    if (["avatar", "logo"].includes(field)) {
      buffer = sharp(buffer).resize(400, 400);
    } else if (field == "cover") {
      buffer = sharp(buffer).resize(1600, 900);
    } else buffer = sharp(buffer).resize(1080);

    buffer = await buffer.webp({ quality: 80 }).toBuffer();
    const size = buffer.length;
    await Upload.create({ uid, filename, field, buffer, size, identifier });
    if (field == "avatar")
      return await User.findByIdAndUpdate(
        identifier,
        { avatar: filename },
        { new: true },
      );
    else if (field == "logo")
      await Business.findByIdAndUpdate(identifier, { logo: filename });
    else if (field == "cover")
      await Business.findByIdAndUpdate(identifier, { cover: filename });
    else if (field == "service")
      await Service.findByIdAndUpdate(identifier, { image: filename });
    else
      await Business.findByIdAndUpdate(identifier, {
        $push: { images: filename },
      });
    return filename;
  } catch (error) {
    throw error;
  }
}
