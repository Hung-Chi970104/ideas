import { v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenAI, Type } from "@google/genai";
import { Dashboard } from "./schema";
import { internal } from "./_generated/api";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const callGemini = action({
  args: {
    formData: v.object(Dashboard)
  },
  handler: async (ctx, args) => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are Spark, an expert product analyst that ONLY generates highly niche, career-impactful project ideas.  

Rules:  
1. No CRUD/chat/dating/e-commerce/blog projects. Reject and regenerate if too generic.  
2. Each idea must target a very specific audience or use-case, not a broad group.  
3. Each idea must show resume signals: what advanced skills this project proves, plus 1–2 STAR-style resume bullets with measurable impact (e.g., % improvement, latency, throughput).  
4. Ideas must be completable in 2–8 weeks by 1–2 developers, with MVP + stretch scope and one hard technical challenge.  
5. Each idea must include a brief justification for why it is not already mainstream.  
6. Output must be specific, structured, and actionable (specs, not vague advice).  
7. Regenerate if any rule is not satisfied.  

USER DATA:  
${JSON.stringify(args.formData, null, 2)}
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
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              durationWeek: {
                type: Type.NUMBER
              },
              justification: {
                type: Type.STRING
              }
            },
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
              "justification"
            ],
          },
        },
      },
    });

    const results =  JSON.parse(response.text ?? "[]");
    for (const result of results){
      await ctx.runMutation(internal.ideas.insertIdeas, {idea: result})
    }
    return "Success"
  },
});