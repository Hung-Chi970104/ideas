import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Dashboard } from "./schema";
import { getCurrentUserOrThrow } from "./users";

export const getDashboard = query({
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx)
    if (!user) return null
    const dashboard = await ctx.db
      .query("dashboards")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique()

    return dashboard
  },
});

export const upsertDashboard = mutation({
  args: { formData: v.object(Dashboard) },
  handler: async (ctx, { formData }) => {
    const user = await getCurrentUserOrThrow(ctx)
    const existing = await ctx.db
      .query("dashboards")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, { ...formData });
    } else {
      await ctx.db.insert("dashboards", {
        userId: user._id,
        ...formData
      });
    }
  },
});