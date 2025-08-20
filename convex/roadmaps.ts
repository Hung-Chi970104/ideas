import { internalMutation, internalQuery, mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import {userByClerkUserId} from "./users"
import { Dashboard, Idea, RoadmapWeek } from "./schema";
import { getCurrentUserOrThrow } from "./users";
import { Id } from "./_generated/dataModel";

// Get roadmap
export const getRoadmapForUser = query({
  args: { ideaId: v.id("ideas") },
  handler: async (ctx, { ideaId }) => {

    const roadmapWeeks = await ctx.db
      .query("roadmapWeeks")
      .withIndex("by_ideaId", (q) => q.eq("ideaId", ideaId))
      .collect()

    return roadmapWeeks
  },
})

export const getRoadmapForConvex = internalQuery({
  args: { ideaId: v.id("ideas") },
  handler: async (ctx, { ideaId }) => {

    const roadmapWeeks = await ctx.db
      .query("roadmapWeeks")
      .withIndex("by_ideaId", (q) => q.eq("ideaId", ideaId))
      .collect()

    return roadmapWeeks
  },
})

// Insert Roadmap
export const insertRoadmaps = internalMutation({
  args: { 
    ideaId: v.id("ideas"),
    week: v.object(RoadmapWeek)
   },
  handler: async (ctx, { week, ideaId }) => {
    const user = await getCurrentUserOrThrow(ctx);

    await ctx.db.insert("roadmapWeeks", {
      userId: user._id,
      ideaId: ideaId,
      ...week,
    });
  },
});

// Delete Ideas
export const deleteRoadmaps = internalMutation({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, { userId }) => {
    const roadmapWeeks = await ctx.db
      .query("roadmapWeeks")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect()

    if (roadmapWeeks.length === 0) {
      return { deleted: false, reason: "No roadmaps for this user" };
    }

    for (const roadmapWeek of roadmapWeeks) {
      await ctx.db.delete(roadmapWeek._id);
    }

  },
});