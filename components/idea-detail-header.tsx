import { Button } from "@/components/ui/button"
import { ScoreBadge } from "@/components/score-badge"
import type { MockIdea } from "@/lib/mock"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface IdeaDetailHeaderProps {
  idea: MockIdea
}

export function IdeaDetailHeader({ idea }: IdeaDetailHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold font-heading leading-tight">{idea.title}</h1>

        <div className="flex flex-wrap gap-3">
          <ScoreBadge label="Market Fit" score={idea.scores.fit} />
          <ScoreBadge label="Trend" score={idea.scores.trend} />
          <ScoreBadge label="Feasible" score={idea.scores.feasible} />
          <ScoreBadge label="Niche" score={idea.scores.niche} />
        </div>

        <div className="flex flex-wrap gap-2">
          {idea.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 text-sm bg-muted rounded-full text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
