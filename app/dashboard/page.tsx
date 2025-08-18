"use client"

import { useEffect, useRef, useState } from "react"
import { IntakeForm, type IntakeFormData } from "@/components/dashboard/intake-form"
import { IdeaList } from "@/components/ideas/idea-list"
import type { MockIdea } from "@/lib/mock"

import { useAction, useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Navbar } from "@/components/navbar"
import { ClerkLoaded, SignedIn, useAuth } from "@clerk/nextjs"


export default function DashboardPage() {

  const [generatedIdeas, setGeneratedIdeas] = useState<MockIdea[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const callGemini = useAction(api.ai.callGemini);
  const runAI = async (formData: IntakeFormData) => {
    return await callGemini({ formData });
  };

  const upsertDashboard = useMutation(api.dashboards.upsertDashboard)

  const ideas = useQuery(api.ideas.getIdeasForUser);

  useEffect(() => {
    if (ideas === undefined) return

    if (ideas) {
      setGeneratedIdeas(ideas)
    }

  }, [ideas])

  // Actual Function
  const handleGenerateIdeas = async (formData: IntakeFormData) => {
    setIsGenerating(true)

    upsertDashboard({ formData })
    await runAI(formData)

    const filteredIdeas = (ideas??[]).slice(0, 8) // Show first 8 ideas
    setGeneratedIdeas(filteredIdeas)
    setIsGenerating(false)
  }

  return (
    <>
      <ClerkLoaded>
        <Navbar />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold font-heading mb-2">Idea Generator Dashboard</h1>
              <p className="text-muted-foreground">
                Tell us about your skills and interests to get personalized startup ideas
              </p>
            </div>

            <SignedIn>
              <IntakeForm onGenerateIdeas={handleGenerateIdeas} />
            </SignedIn>



            {isGenerating && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center animate-pulse">
                  <svg className="w-8 h-8 text-orange-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold font-heading mb-2">Generating Ideas...</h3>
                <p className="text-muted-foreground">
                  Our AI is analyzing your profile to create personalized startup ideas
                </p>
              </div>
            )}
            <SignedIn>
              <IdeaList ideas={generatedIdeas} />
            </SignedIn>
          </div>
        </div>
      </ClerkLoaded>
    </>
  )
}
