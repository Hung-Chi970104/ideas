import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Map, Heart, Share } from "lucide-react"

const activities = [
  {
    type: "idea",
    title: "Generated new idea: AI-Powered Fitness Meal Planner",
    time: "2 hours ago",
    icon: Lightbulb,
  },
  {
    type: "roadmap",
    title: "Created roadmap for Remote Team Wellness Platform",
    time: "1 day ago",
    icon: Map,
  },
  {
    type: "save",
    title: "Saved idea: Sustainable Fashion Marketplace",
    time: "3 days ago",
    icon: Heart,
  },
  {
    type: "share",
    title: "Shared roadmap with team members",
    time: "1 week ago",
    icon: Share,
  },
  {
    type: "idea",
    title: "Generated 5 new ideas in FinTech category",
    time: "1 week ago",
    icon: Lightbulb,
  },
]

const getActivityColor = (type: string) => {
  switch (type) {
    case "idea":
      return "text-blue-500"
    case "roadmap":
      return "text-green-500"
    case "save":
      return "text-red-500"
    case "share":
      return "text-purple-500"
    default:
      return "text-muted-foreground"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity.type)}`}>
                <activity.icon className="h-3 w-3" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
