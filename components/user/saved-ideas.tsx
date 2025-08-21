import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MoreHorizontal } from "lucide-react"
import Link from "next/link"

const savedIdeas = [
  {
    id: "1",
    title: "AI-Powered Fitness Meal Planner",
    description: "Personalized nutrition planning app for fitness enthusiasts",
    scores: { fit: 92, trend: 88 },
    savedDate: "2 days ago",
  },
  {
    id: "2",
    title: "Remote Team Wellness Platform",
    description: "Mental health and wellness tools for distributed teams",
    scores: { fit: 85, trend: 91 },
    savedDate: "1 week ago",
  },
  {
    id: "3",
    title: "Sustainable Fashion Marketplace",
    description: "Platform connecting eco-conscious consumers with sustainable brands",
    scores: { fit: 78, trend: 82 },
    savedDate: "2 weeks ago",
  },
]

export function SavedIdeas() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Saved Ideas</CardTitle>
            <CardDescription>Ideas you&apos;ve bookmarked for later review</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm">{idea.title}</h3>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{idea.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Fit: {idea.scores.fit}%
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Trend: {idea.scores.trend}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{idea.savedDate}</span>
                    <Button asChild variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Link href={`/ideas/${idea.id}`}>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
