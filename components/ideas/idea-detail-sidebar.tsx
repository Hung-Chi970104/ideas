import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { MockIdea } from "@/lib/mock"
import { Rocket, Clock, DollarSign, Users } from "lucide-react"
import Link from "next/link"

interface IdeaDetailSidebarProps {
  idea: MockIdea
}

export function IdeaDetailSidebar({ idea }: IdeaDetailSidebarProps) {
  return (
    <div className="space-y-6">
      {/* CTA Card */}
      <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-pink-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Ready to Build?
          </CardTitle>
          <CardDescription>Get a detailed 6-week roadmap to launch this idea</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="lg" className="w-full">
            <Link href={`/roadmap/${idea._id}`}>Create Roadmap</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Time to MVP</p>
              <p className="text-xs text-muted-foreground">6-8 weeks</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Initial Investment</p>
              <p className="text-xs text-muted-foreground">$500-2,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Team Size</p>
              <p className="text-xs text-muted-foreground">1-2 people</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Similar Ideas */}
      <Card>
        <CardHeader>
          <CardTitle>Similar Ideas</CardTitle>
          <CardDescription>Other opportunities you might like</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
            <h4 className="text-sm font-medium">AI Meeting Summarizer</h4>
            <p className="text-xs text-muted-foreground">Similar tech stack, different market</p>
          </div>
          <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
            <h4 className="text-sm font-medium">No-Code API Builder</h4>
            <p className="text-xs text-muted-foreground">Developer tools space</p>
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2">
            View All Similar Ideas
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
