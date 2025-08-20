import { v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenAI, Type } from "@google/genai";
import { Dashboard, Idea } from "./schema";
import { internal } from "./_generated/api";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const callGeminiForIdeas = action({
  args: {
    formData: v.object(Dashboard)
  },
  handler: async (ctx, { formData }) => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `
You are **Spark**, an expert product strategist and technical analyst.  
Your job is to generate **highly niche, career-impactful project ideas** that a programmer could build into a polished MVP in 2–8 weeks.  

### Rules
1. **Reject & regenerate** any idea that is too broad or generic (CRUD apps, chat apps, dating apps, e-commerce, blogs, social media clones).  
2. Each idea must serve a **very specific audience or workflow**, defined by both **role + context** (e.g., not "all developers" → instead "junior TypeScript devs onboarding into large React codebases at startups").  
3. Every idea must explicitly show:  
   - **Resume signals:** what advanced skills this project proves.  
   - **1–2 STAR-style resume bullets** with measurable impact (e.g., "% improvement in latency", "X throughput gain").  
4. MVPs must be completable in **2–8 weeks by 1–2 developers (nights/weekends feasible)**.  
   - Include:  
     - **MVP scope** (tiny but functional version).  
     - **Stretch goals** (the natural next step after MVP).  
     - **One hard technical challenge** and how to approach solving it.  
5. Justify **why the idea is not already mainstream** (what wedge or missing gap makes this valuable now).  
6. Output must be **specific, structured, and actionable** (concrete specs, not vague advice).  
7. Where relevant, leverage **current market/tech trends** and assume access to modern open-source tools.  
8. If any rule is not satisfied, **regenerate until all rules are met**.

USER DATA:  
${JSON.stringify(formData, null, 2)}
`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          maxItems: 3,
          minItems: 3,
          items: {
            type: Type.OBJECT,
            properties: {
              ideaTitle: {
                type: Type.STRING
              },
              description: {
                type: Type.STRING
              },
              targetAudience: {
                type: Type.STRING
              },
              painPoint: {
                type: Type.STRING
              },
              marketFit: {
                type: Type.STRING,
                enum: ["High", "Med", "Low"]
              },
              trend: {
                type: Type.STRING,
                enum: ["High", "Med", "Low"]
              },
              difficulty: {
                type: Type.STRING,
                enum: ["High", "Med", "Low"]
              },
              niche: {
                type: Type.STRING,
                enum: ["High", "Med", "Low"]
              },
              techStack: {
                type: Type.OBJECT,
                properties: {
                  frontend: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  backend: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  database: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  hosting: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                },
              },
              durationWeek: {
                type: Type.NUMBER
              },
              justification: {
                type: Type.STRING
              },
              minimalViableProduct: {
                type: Type.STRING
              },
              essentialFeatures: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    featureTitle: { type: Type.STRING },
                    featureDescription: { type: Type.STRING },
                  },
                  required: ["featureTitle", "featureDescription"],
                  propertyOrdering: ["featureTitle", "featureDescription"],
                },
                minItems: 1
              },
              keyWords: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: [
              "ideaTitle",
              "description",
              "targetAudience",
              "painPoint",
              "marketFit",
              "trend",
              "difficulty",
              "niche",
              "techStack",
              "durationWeek",
              "justification",
              "minimalViableProduct",
              "essentialFeatures",
              "keyWords"
            ],

            propertyOrdering: [
              "ideaTitle",
              "description",
              "targetAudience",
              "painPoint",
              "marketFit",
              "trend",
              "difficulty",
              "niche",
              "techStack",
              "durationWeek",
              "justification",
              "minimalViableProduct",
              "essentialFeatures",
              "keyWords"
            ],
          },
        },
      },
    });

    const results = JSON.parse(response.text ?? "[]");
    for (const result of results) {
      await ctx.runMutation(internal.ideas.insertIdeas, { idea: result })
    }
    return results
  },
});

export const callGeminiForRoadmaps = action({
  args: {
    ideaId: v.id("ideas"),
  },
  handler: async (ctx, { ideaId }) => {
    const idea = await ctx.runQuery(internal.ideas.getIdeaById, { ideaId })
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `
You are an expert product roadmap planner.  
Given the following project idea, generate a week-by-week roadmap.  

IDEA TITLE: ${idea?.ideaTitle}
DESCRIPTION: ${idea?.description}
TARGET AUDIENCE: ${idea?.targetAudience}
PAIN POINT: ${idea?.painPoint}
ESSENTIAL FEATURES: ${JSON.stringify(idea?.essentialFeatures, null, 2)}

TECH STACK:
Frontend: ${idea?.techStack.frontend.join(", ")}
Backend: ${idea?.techStack.backend.join(", ")}
Database: ${idea?.techStack.database.join(", ")}
Hosting: ${idea?.techStack.hosting.join(", ")}
MVP: ${idea?.minimalViableProduct ?? "Not specified"}

Return an array of exactly ${idea?.durationWeek} roadmap objects.
`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          maxItems: idea?.durationWeek,
          minItems: idea?.durationWeek,
          items: {
            type: Type.OBJECT,
            properties: {
              weekOrder: {
                type: Type.NUMBER
              },
              goal: {
                type: Type.STRING
              },
              tasks: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              acceptanceCriteria: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              links: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              ship: {
                type: Type.STRING,
              },
            },
            required: [
              "weekOrder",
              "goal",
              "tasks",
              "acceptanceCriteria",
              "links",
              "ship"
            ],

            propertyOrdering: [
              "weekOrder",
              "goal",
              "tasks",
              "acceptanceCriteria",
              "links",
              "ship"
            ],
          },
        },
      },
    });

    const results = JSON.parse(response.text ?? "[]");
    for (const result of results) {
      await ctx.runMutation(internal.roadmaps.insertRoadmaps, { ideaId: ideaId, week: result })
    }
    return results
  },
});