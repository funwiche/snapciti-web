// server/create-file.post.ts
import { mkdir, writeFile } from "node:fs/promises";
import { $links } from "@/utils";
import { join } from "node:path";
const routes = Object.values($links).flat();
export default defineEventHandler(async (event) => {
  try {
    for (const { title, path, desc } of routes) {
      const ending = path.slice(0, path.lastIndexOf("/"));
      const folderPath = join(process.cwd(), "pages", ending);
      const fileName = path.slice(path.lastIndexOf("/")) + ".vue";
      const filePath = join(folderPath, fileName);
      await mkdir(folderPath, { recursive: true });
      const content = `<template><section class="lg py-6"><h1>{{ tn(title) }}</h1><v-body class="lg" /></section></template><script setup lang="ts">const title="${title}";useSeoData({title,desc:"${desc}"});</script><style scoped></style>`;
      await writeFile(filePath, content);
      console.log(filePath);
    }

    return { status: "success" };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
