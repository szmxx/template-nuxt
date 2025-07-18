// server/api/items.post.ts
import { items } from "~/server/utils/items";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newItem = { id: items.length + 1, name: body.name };
  items.push(newItem);
  return newItem;
});
