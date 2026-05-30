import Upload from "~/server/models/Upload";
export default defineEventHandler(async (event) => {
  const filename = getRouterParam(event, "name");
  const file = await Upload.findOne({ filename });
  if (!file) return returnError({ message: "image_not_found" });
  setHeader(event, "Content-Type", file.mimeType);
  setHeader(event, "Cache-Control", "public, max-age=31536000");
  return file.buffer;
});
