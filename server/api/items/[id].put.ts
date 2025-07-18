// server/api/items/[id].put.ts
import { items } from "~/server/utils/items";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id ?? "");
  const body = await readBody(event);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: "Item not found" });
  }
  items[index] = { ...items[index], name: body.name };
  return items[index];
});
