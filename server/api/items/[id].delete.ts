// server/api/items/[id].delete.ts
import { items } from "~/server/utils/items";
import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  // 确保 params 存在并且有 id 值
  const id = parseInt(event.context.params?.id ?? "");
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: "Item not found" });
  }
  const deletedItem = items.splice(index, 1)[0];
  return deletedItem;
});
