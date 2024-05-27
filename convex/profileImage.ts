import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMediaUrl = query({
  args: { storageId: v.optional(v.id("_storage")) },
  handler: async (ctx, args) => {
    if (!args.storageId) return null;
    return await ctx.storage.getUrl(args.storageId);
  },
});
