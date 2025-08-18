import { internalMutation, internalQuery, mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { Dashboard, Idea } from "./schema";
import { getCurrentUserOrThrow } from "./users";
import { Id } from "./_generated/dataModel";

async function getIdeas(ctx: QueryCtx, userId: Id<"users">) {
  return await ctx.db
    .query("ideas")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .collect()
}

// Get form data (from clients)
export const getIdeasForUser = query({
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx)
    if (!user) return null
    return getIdeas(ctx, user._id)
  },
});

// Get form data (from server)
export const getIdeasForServer = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return getIdeas(ctx, userId)
  },
});

// Insert
export const insertIdeas = internalMutation({
  args: { idea: v.object(Idea) },
  handler: async (ctx, { idea }) => {
    const user = await getCurrentUserOrThrow(ctx);

    await ctx.db.insert("ideas", {
      userId: user._id,
      ...idea,
    });
  },
});

// Delete dashboard
export const deleteIdeas = internalMutation({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, { userId }) => {
    const ideas = await ctx.db
      .query("ideas")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect()

    if (ideas.length === 0) {
      return { deleted: false, reason: "No ideas for this user" };
    }

    for (const idea of ideas) {
      await ctx.db.delete(idea._id);
    }

  },
});