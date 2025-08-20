"use client"

import { useEffect, useState } from "react"
import { IntakeForm, type IntakeFormData } from "@/components/dashboard/intake-form"
import { IdeaList } from "@/components/ideas/idea-list"

import { useAction, useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Navbar } from "@/components/Navbar"
import { ClerkLoaded, SignedIn } from "@clerk/nextjs"
import { Doc } from "@/convex/_generated/dataModel"


export default function DashboardPage() {

  const [generatedIdeas, setGeneratedIdeas] = useState<Doc<"ideas">[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const callGeminiForIdeas = useAction(api.ai.callGeminiForIdeas);
  const runAIForIdeas = async (formData: IntakeFormData) => {
    return await callGeminiForIdeas({ formData });
  };

  const upsertDashboard = useMutation(api.dashboards.upsertDashboard)
  const updateDashboardStatus = useMutation(api.dashboards.updateDashboardStatus)
  const dashboard = useQuery(api.dashboards.getDashboardForUser)

  const ideas = useQuery(api.ideas.getIdeasForUser);

  useEffect(() => {
    if (ideas === undefined) return

    if (ideas) {
      setGeneratedIdeas(ideas)
    }

  }, [ideas])

  useEffect(() => {
    setIsGenerating(dashboard?.isGeneratingIdea ?? false)
  }, [dashboard])

  // Actual Function
  const handleGenerateIdeas = async (formData: IntakeFormData) => {
    upsertDashboard({
      formData: formData,
      isGeneratingIdea: true,
      isGeneratingRoadmap: dashboard?.isGeneratingRoadmap ?? false
    })
    updateDashboardStatus({ isGeneratingIdea: true })
    const result = await runAIForIdeas(formData)
    console.log(result)

    updateDashboardStatus({ isGeneratingIdea: false })
  }

  const handleSaveDashboard = async (formData: IntakeFormData) => {
    upsertDashboard({
      formData: formData,
      isGeneratingIdea: dashboard?.isGeneratingIdea ?? false,
      isGeneratingRoadmap: dashboard?.isGeneratingIdea ?? false
    })
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
              <IntakeForm onGenerateIdeas={handleGenerateIdeas} saveFormData={handleSaveDashboard} />
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
