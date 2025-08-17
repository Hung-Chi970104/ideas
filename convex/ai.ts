import { v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenAI, Type } from "@google/genai";
import { Dashboard } from "./schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const callGemini = action({
  args: {
    formData: v.object(Dashboard)
  },
  handler: async (_, args) => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an expert product analyst. 
Your job is to generate and evaluate **highly niche project ideas** based on the user's profile.  

CRITERIA:
- Avoid generic or overused ideas such as: task managers, chat apps, dating apps, e-commerce stores, or blogging platforms.
- Each idea must target a very specific audience, industry, or use-case. (e.g. "AI tool for indie game pixel artists" instead of "AI tool for designers.")
- Only suggest problems that are underserved or have no widely adopted solution.
- Before finalizing each idea, briefly justify why it is not already mainstream.

USER DATA:
${JSON.stringify(args.formData, null, 2)}

Field meanings:
- ideaTitle: Provide a brief title for this idea.
- description: Provide a description about what this product does. 
- targetAudience: Provide a description about who is the potential audience.
- painPoint: Explain what issues many people have encountered and how this project can help to solve them.
- marketFit: Evaluate and choose the market demand and how well the idea matches that demand ("High", "Med", "Low").
- trend: Rate how well the idea aligns with current technology and market trends ("High", "Med", "Low").
- difficulty: Rate how difficult the idea is given common resources, skills, and time ("High", "Med", "Low").
- niche: Rate how unique and specific the target market is ("High", "Med", "Low").
- techStack: List of core technologies, frameworks, or APIs needed for implementation.
- durationWeek: Estimate the number of weeks this project is going to take
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
              "durationWeek"
            ],
          },
        },
      },
    });

    return JSON.parse(response.text ?? "[]");
  },
});