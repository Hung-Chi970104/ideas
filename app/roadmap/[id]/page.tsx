import { notFound } from "next/navigation"
import { mockIdeas, mockRoadmap } from "@/lib/mock"
import { RoadmapHeader } from "@/components/roadmap-header"
import { RoadmapTimeline } from "@/components/roadmap-timeline"

interface RoadmapPageProps {
  params: {
    id: string
  }
}

export default function RoadmapPage({ params }: RoadmapPageProps) {
  const idea = mockIdeas.find((idea) => idea.id === params.id)
  const roadmap = mockRoadmap(params.id)

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
