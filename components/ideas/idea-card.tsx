import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScoreBadge } from "@/components/score-badge"
import type { MockIdea } from "@/lib/mock"
import Link from "next/link"

interface IdeaCardProps {
  idea: MockIdea
}

export function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/70 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-heading leading-tight">{idea.title}</CardTitle>
        <CardDescription className="text-sm">
          <span className="font-medium">Who:</span> {idea.who}
        </CardDescription>
        <CardDescription className="text-sm">
          <span className="font-medium">Pain:</span> {idea.pain}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Score badges */}
        <div className="flex flex-wrap gap-2">
          <ScoreBadge label="Fit" score={idea.scores.fit} />
          <ScoreBadge label="Trend" score={idea.scores.trend} />
          <ScoreBadge label="Feasible" score={idea.scores.feasible} />
          <ScoreBadge label="Niche" score={idea.scores.niche} />
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1">
          {idea.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
              {tech}
            </span>
          ))}
          {idea.techStack.length > 3 && (
            <span className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
              +{idea.techStack.length - 3} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
            <Link href={`/ideas/${idea.id}`}>View details</Link>
          </Button>
          <Button asChild size="sm" className="flex-1">
            <Link href={`/roadmap/${idea.id}`}>Create roadmap</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
