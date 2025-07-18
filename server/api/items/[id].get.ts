// server/api/items/[id].get.ts
import { items } from "~/server/utils/items";
import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  const id = parseInt(event.context.params?.id ?? "");
  const item = items.find((item) => item.id === id);
  if (!item) {
    throw createError({ statusCode: 404, statusMessage: "Item not found" });
  }
  return item;
});
