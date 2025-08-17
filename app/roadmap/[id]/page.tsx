import { notFound } from "next/navigation"
import { mockIdeas, mockRoadmap } from "@/lib/mock"
import { RoadmapHeader } from "@/components/roadmap/roadmap-header"
import { RoadmapTimeline } from "@/components/roadmap/roadmap-timeline"

export default async function RoadmapPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const idea = mockIdeas.find((idea) => idea.id === id)
  const roadmap = mockRoadmap(id)

  if (!idea) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl py-8 px-4">
        <RoadmapHeader idea={idea} roadmap={roadmap} />
        <RoadmapTimeline roadmap={roadmap} />
      </div>
    </div>
  )
}
