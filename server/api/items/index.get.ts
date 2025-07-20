// server/api/items.get.ts
import { items } from "~/server/utils/items";
import { defineEventHandler } from "h3";

export default defineEventHandler(() => {
  return items;
});
