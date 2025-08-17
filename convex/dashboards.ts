import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Dashboard } from "./schema";
import { getCurrentUserOrThrow } from "./users";

// Get form data
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

// Upsert (Update or Insert)
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

// Delete dashboard
export const deleteDashboard = internalMutation({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, {userId}) => {
    const existing = await ctx.db
      .query("dashboards")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique()

    if (!existing) {
      return { deleted: false, reason: "No dashboard for this user" };
    }
    await ctx.db.delete(existing._id);
  },
});