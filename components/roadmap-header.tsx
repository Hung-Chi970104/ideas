"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { MockIdea, MockRoadmap } from "@/lib/mock"
import { ArrowLeft, Download, Calendar } from "lucide-react"
import Link from "next/link"

interface RoadmapHeaderProps {
  idea: MockIdea
  roadmap: MockRoadmap
}

export function RoadmapHeader({ idea, roadmap }: RoadmapHeaderProps) {
  const handleExport = () => {
    // TODO: Implement roadmap export functionality
    console.log("Export roadmap - TODO: Implement PDF/CSV export")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/ideas/${idea.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Idea Details
          </Link>
        </Button>
      </div>

      <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-pink-500/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-heading">{idea.title} - Launch Roadmap</CardTitle>
              <CardDescription className="text-base">
                Your 6-week plan to build and launch this startup idea
              </CardDescription>
            </div>
            <Button onClick={handleExport} variant="outline" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">6 weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Total Tasks:</span>
              <span className="font-medium">{roadmap.weeks.reduce((acc, week) => acc + week.tasks.length, 0)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Milestones:</span>
              <span className="font-medium">{roadmap.weeks.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
