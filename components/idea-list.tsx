import { IdeaCard } from "@/components/idea-card"
import type { MockIdea } from "@/lib/mock"

interface IdeaListProps {
  ideas: MockIdea[]
}

export function IdeaList({ ideas }: IdeaListProps) {
  if (ideas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold font-heading mb-2">No ideas yet</h3>
        <p className="text-muted-foreground">Fill out the form above to generate personalized startup ideas</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-heading">Your Personalized Ideas</h2>
        <span className="text-sm text-muted-foreground">{ideas.length} ideas generated</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  )
}
