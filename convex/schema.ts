import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const Tier = v.union(
      v.literal("High"),
      v.literal("Med"),
      v.literal("Low")
    )

const TimeCommitment = v.union(
      v.literal("Evenings (5-10 hours/week)"),
      v.literal("Part-time (10-20 hours/week)"),
      v.literal("Full-time (40+ hours/week)"),
      v.literal("Weekends only")
    )

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),

    // Dashboard Info
    skills: v.optional(v.array(v.string())),
    techStacks: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    timeCommitment: v.optional(TimeCommitment),
    description: v.optional(v.string()),
    revenueGoal: v.optional(v.string()),

  }).index('byClerkUserId', ['clerkUserId'])
    .index('byEmail', ['email']),

  idea: defineTable({
    userId: v.id("users"),
    targetAudience: v.string(),
    painPoint: v.string(),
    marketFit: Tier,
    trend: Tier,
    feasible: Tier,
    niche: Tier,
    techStack: v.array(v.string()),
    durationWeek: v.number()
  })
})