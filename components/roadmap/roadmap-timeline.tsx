"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, Circle, ExternalLink, Flag } from "lucide-react"
import { Doc } from "@/convex/_generated/dataModel"

interface RoadmapTimelineProps {
  roadmap: Doc<"roadmapWeeks">[]
}

export function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  const [completedWeeks, setCompletedWeeks] = useState<Set<number>>(new Set())
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const toggleWeekComplete = (weekNumber: number) => {
    const newCompletedWeeks = new Set(completedWeeks)
    if (newCompletedWeeks.has(weekNumber)) {
      newCompletedWeeks.delete(weekNumber)
    } else {
      newCompletedWeeks.add(weekNumber)
    }
    setCompletedWeeks(newCompletedWeeks)
  }

  const toggleTaskComplete = (taskId: string) => {
    const newCompletedTasks = new Set(completedTasks)
    if (newCompletedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId)
    } else {
      newCompletedTasks.add(taskId)
    }
    setCompletedTasks(newCompletedTasks)
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-heading">Launch Timeline</h2>
        <div className="text-sm text-muted-foreground">
          {completedWeeks.size} of {roadmap.length} weeks completed
        </div>
      </div>

      <div className="space-y-6">
        {roadmap.map((week, index) => (
          <WeekCard
            key={week.weekOrder}
            week={week}
            isCompleted={completedWeeks.has(week.weekOrder)}
            completedTasks={completedTasks}
            onToggleWeek={() => toggleWeekComplete(week.weekOrder)}
            onToggleTask={toggleTaskComplete}
            isLast={index === roadmap.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

interface WeekCardProps {
  week: Doc<"roadmapWeeks">
  isCompleted: boolean
  completedTasks: Set<string>
  onToggleWeek: () => void
  onToggleTask: (taskId: string) => void
  isLast: boolean
}

function WeekCard({ week, isCompleted, completedTasks, onToggleWeek, onToggleTask, isLast }: WeekCardProps) {
  const taskIds = week.tasks.map((task, index) => `week-${week.weekOrder}-task-${index}`)
  const completedTaskCount = taskIds.filter((id) => completedTasks.has(id)).length
  const progressPercentage = (completedTaskCount / week.tasks.length) * 100

  return (
    <div className="relative">
      {/* Timeline connector */}
      {!isLast && <div className="absolute left-6 top-20 w-0.5 h-16 bg-border z-0" />}

      <Card
        className={`relative z-10 ${isCompleted ? "border-green-500/50 bg-green-500/5" : "border-border/50 bg-card/50"} backdrop-blur`}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-pink-500/20 border-2 border-orange-500/30">
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <span className="text-lg font-bold font-heading">{week.weekOrder}</span>
                )}
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl font-heading">{week.goal}</CardTitle>
                <CardDescription>Week {week.weekOrder} of 6</CardDescription>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {completedTaskCount}/{week.tasks.length} tasks
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={onToggleWeek}
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              className={isCompleted ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {isCompleted ? "Completed" : "Mark Done"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Tasks */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Circle className="w-4 h-4" />
              Tasks
            </h4>
            <div className="space-y-2 ml-6">
              {week.tasks.map((task, index) => {
                const taskId = `week-${week.weekOrder}-task-${index}`
                const isTaskCompleted = completedTasks.has(taskId)
                return (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox
                      checked={isTaskCompleted}
                      onCheckedChange={() => onToggleTask(taskId)}
                      className="mt-0.5"
                    />
                    <span className={`text-sm ${isTaskCompleted ? "line-through text-muted-foreground" : ""}`}>
                      {task}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Acceptance Criteria */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Acceptance Criteria
            </h4>
            <div className="space-y-2 ml-6">
              {week.acceptanceCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                  <span className="text-sm text-muted-foreground">{criteria}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {week.links.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Resources
              </h4>
              <div className="space-y-2 ml-6">
                {week.links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-blue-500 hover:underline cursor-pointer">{link}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ship Checkpoint */}
          <div className="p-4 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-lg border border-orange-500/20">
            <div className="flex items-start gap-3">
              <Flag className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-1">Ship Checkpoint</h4>
                <p className="text-sm text-muted-foreground">{week.ship}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
