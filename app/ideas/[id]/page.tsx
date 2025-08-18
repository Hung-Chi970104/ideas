import { notFound } from "next/navigation"
import { IdeaDetailHeader } from "@/components/ideas/idea-detail-header"
import { IdeaDetailTabs } from "@/components/ideas/idea-detail-tabs"
import { IdeaDetailSidebar } from "@/components/ideas/idea-detail-sidebar"
import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { ClerkLoaded } from "@clerk/nextjs"

export default async function IdeaDetailPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params

  const ideas = await fetchQuery(api.ideas.getIdeasForUser)

  const idea = ideas?.find((idea) => idea._id === id)

  if (!idea) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl py-8 px-4">
        <ClerkLoaded>
          <IdeaDetailHeader idea={idea} />
          <div className="grid gap-8 lg:grid-cols-3 mt-8">
            <div className="lg:col-span-2">
              <IdeaDetailTabs idea={idea} />
            </div>
            <div className="lg:col-span-1">
              <IdeaDetailSidebar idea={idea} />
            </div>
          </div>
        </ClerkLoaded>
      </div>
    </div>

  )
}
