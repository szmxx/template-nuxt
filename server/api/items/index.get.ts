// server/api/items.get.ts
import { items } from "~/server/utils/items";
import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 休眠 3 秒
  return items;
});
