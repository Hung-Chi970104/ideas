import { notFound } from "next/navigation"
import { mockIdeas } from "@/lib/mock"
import { IdeaDetailHeader } from "@/components/idea-detail-header"
import { IdeaDetailTabs } from "@/components/idea-detail-tabs"
import { IdeaDetailSidebar } from "@/components/idea-detail-sidebar"

export default async function IdeaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const idea = mockIdeas.find((idea) => idea.id === id)

  if (!idea) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl py-8 px-4">
  <IdeaDetailHeader idea={idea} />

        <div className="grid gap-8 lg:grid-cols-3 mt-8">
          <div className="lg:col-span-2">
            <IdeaDetailTabs idea={idea} />
          </div>
          <div className="lg:col-span-1">
            <IdeaDetailSidebar idea={idea} />
          </div>
        </div>
      </div>
    </div>
  )
}
