import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const Tier = v.union(
  v.literal("High"),
  v.literal("Med"),
  v.literal("Low")
)

export const TimeCommitment = v.union(
  v.literal("evenings"),
  v.literal("part-time"),
  v.literal("full-time"),
  v.literal("weekends")
)

export const User = {
  email: v.string(),
  clerkUserId: v.string(),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
}

export const Dashboard = {
  skills: v.optional(v.array(v.string())),
  techStacks: v.optional(v.array(v.string())),
  interests: v.optional(v.array(v.string())),
  timeCommitment: v.optional(TimeCommitment),
  description: v.optional(v.string()),
  targetAudience: v.optional(v.string()),
  revenueGoal: v.optional(v.string()),

}

export const Idea = {
  ideaTitle: v.string(),
  description: v.string(),
  targetAudience: v.string(),
  painPoint: v.string(),
  marketFit: Tier,
  trend: Tier,
  difficulty: Tier,
  niche: Tier,
  techStack: v.object({
    frontend: v.array(v.string()),
    backend: v.array(v.string()),
    database: v.array(v.string()),
    hosting: v.array(v.string())
  }
  ),
  durationWeek: v.number(),
  justification: v.string(),
  minimalViableProduct: v.optional(v.string()),
  essentialFeatures: v.optional(
    v.array(
      v.object({
        featureTitle: v.string(),
        featureDescription: v.string(),
      })
    )
  ),
  keyWords: v.optional(
    v.array(
      v.string()
    )
  )
}

export const RoadmapWeek = {
  weekOrder: v.number(),
  goal: v.string(),
  tasks: v.array(v.string()),
  acceptanceCriteria: v.array(v.string()),
  links: v.array(v.string()),
  ship: v.string()
}


export default defineSchema({
  users: defineTable(User)
    .index('byClerkUserId', ['clerkUserId'])
    .index('byEmail', ['email']),

  dashboards: defineTable({
    userId: v.id("users"),
    isGeneratingIdea: v.boolean(),
    isGeneratingRoadmap: v.boolean(),
    ...Dashboard
  }).index('by_userId', ['userId']),

  ideas: defineTable({
    userId: v.id("users"),

    ...Idea
  }).index('by_userId', ['userId']),

  roadmapWeeks: defineTable({
    userId: v.id("users"),
    ideaId: v.id("ideas"),
    ...RoadmapWeek
  }).index('by_userId', ['userId'])
    .index('by_ideaId', ['ideaId']),

})