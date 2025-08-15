import { v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


export const callGemini = action({
  args: {
    formData: v.object({
      skills: v.array(v.string()),
      techStacks: v.array(v.string()),
      interests: v.array(v.string()),
      timeCommitment: v.string(),
      targetAudience: v.string(),
      revenueGoal: v.string(),
    })
  },
  handler: async (_, args) => {
    // implementation goes here
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an expert product analyst. 
Your task is to evaluate a project idea based on the user's profile.

Given the following user data:
${JSON.stringify(args.formData, null, 2)}

Field meanings:
- marketFit: Evaluate and choose the market demand and how well the idea matches that demand ("High", "Med", "Low").
- trend: Rate how well the idea aligns with current technology and market trends ("High", "Med", "Low").
- feasible: Rate how achievable the idea is given common resources, skills, and time ("High", "Med", "Low").
- niche: Rate how unique and specific the target market is ("High", "Med", "Low").
- technologyUsed: List of core technologies, frameworks, or APIs needed for implementation.

Return evaluations for 8 potential project ideas
`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              marketFit: {
                type: Type.STRING,
                enum: ["High", "Med", "Low"]
              },
              trend: {
                type: Type.STRING,
                enum: ["High", "Med", "Low"]
              },
              feasible: {
                type: Type.STRING,
                enum: ["High", "Med", "Low"]
              },
              niche: {
                type: Type.STRING,
                enum: ["High", "Med", "Low"]
              },
              technologyUsed: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            propertyOrdering: [
              "marketFit",
              "trend",
              "feasible",
              "niche",
              "technologyUsed"
            ],
          },
        },
      },
    });

    // optionally return a value
    return response.text;
  },
});