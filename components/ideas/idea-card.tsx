import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScoreBadge } from "@/components/score-badge"
import Link from "next/link"
import { Doc } from "@/convex/_generated/dataModel"

interface IdeaCardProps {
  idea: Doc<"ideas">
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const techStack = Object.values(idea.techStack).flat()

  return (
    <Card className="h-full flex flex-col border-border/50 bg-card/50 backdrop-blur hover:bg-card/70 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-heading leading-tight">{idea.ideaTitle}</CardTitle>
        <CardDescription className="text-sm line-clamp-4">
          <span className="font-medium">Who:</span> {idea.targetAudience}
        </CardDescription>
        <CardDescription className="text-sm line-clamp-4">
          <span className="font-medium">Pain:</span> {idea.painPoint}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-4">
        {/* Score badges */}
        <div className="flex flex-wrap gap-2">
          <ScoreBadge label="Fit" score={idea.marketFit} />
          <ScoreBadge label="Trend" score={idea.trend} />
          <ScoreBadge label="Difficulty" score={idea.difficulty} />
          <ScoreBadge label="Niche" score={idea.niche} />
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1">
          {techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
              +{techStack.length - 3} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
            <Link href={`/ideas/${idea._id}`}>View details</Link>
          </Button>
          <Button asChild size="sm" className="flex-1">
            <Link href={`/ideas/${idea._id}/roadmap`}>Create roadmap</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
