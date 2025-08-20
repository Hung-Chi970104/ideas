import { internalMutation, internalQuery, mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { Dashboard } from "./schema";
import { getCurrentUserOrThrow } from "./users";
import { Id } from "./_generated/dataModel";

async function getDashboard(ctx: QueryCtx, userId: Id<"users">) {
    return await ctx.db
      .query("dashboards")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique()
}

// Get form data (from clients)
export const getDashboardForUser = query({
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx)
    if (!user) return null
    return getDashboard(ctx, user._id)
  },
});

// Get form data (from server)
export const getDashboardForServer = internalQuery({
  args: {userId: v.id("users")},
  handler: async (ctx, {userId}) => {
    return getDashboard(ctx, userId)
  },
});

// Upsert (Update or Insert)
export const upsertDashboard = mutation({
  args: { 
    formData: v.object(Dashboard),
    isGeneratingIdea: v.boolean(),
    isGeneratingRoadmap: v.boolean()
   },
  handler: async (ctx, { formData, isGeneratingIdea, isGeneratingRoadmap}) => {
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
        isGeneratingIdea: isGeneratingIdea,
        isGeneratingRoadmap: isGeneratingRoadmap,
        ...formData
      });
    }
  },
});

export const updateDashboardStatus = mutation({
  args: { 
    isGeneratingIdea: v.boolean()
   },
  handler: async (ctx, { isGeneratingIdea }) => {
    const user = await getCurrentUserOrThrow(ctx)
    const existing = await ctx.db
      .query("dashboards")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, { isGeneratingIdea: isGeneratingIdea });
    } else {
      return "Can't find dashboard"
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