import { notFound } from "next/navigation"
import { RoadmapHeader } from "@/components/roadmap/roadmap-header"
import { RoadmapTimeline } from "@/components/roadmap/roadmap-timeline"
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function RoadmapPage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) notFound()

  const { id } = await params

  const ideas = await fetchQuery(api.ideas.getIdeasForServer, {userId})
  const idea = ideas?.find((idea) => idea._id === id)
  if (!idea) notFound()

  const roadmap = await fetchQuery(api.roadmaps.getRoadmapForUser, {ideaId: idea._id})


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl py-8 px-4">
        <RoadmapHeader idea={idea} roadmap={roadmap} />
        <RoadmapTimeline roadmap={roadmap} />
      </div>
    </div>
  )
}
