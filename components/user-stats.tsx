import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, Map, TrendingUp, Calendar } from "lucide-react"

const stats = [
  {
    title: "Ideas Generated",
    value: "47",
    description: "This month",
    icon: Lightbulb,
    progress: 78,
    limit: "Unlimited",
  },
  {
    title: "Roadmaps Created",
    value: "12",
    description: "Total roadmaps",
    icon: Map,
    progress: 60,
    limit: "20 this month",
  },
  {
    title: "Success Score",
    value: "8.4",
    description: "Average idea rating",
    icon: TrendingUp,
    progress: 84,
    limit: "Out of 10",
  },
  {
    title: "Days Active",
    value: "23",
    description: "This month",
    icon: Calendar,
    progress: 76,
    limit: "30 days",
  },
]

export function UserStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Statistics</CardTitle>
        <CardDescription>Track your progress and usage this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{stat.title}</span>
                </div>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <Progress value={stat.progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{stat.description}</span>
                <span>{stat.limit}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
