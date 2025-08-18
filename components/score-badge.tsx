import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ScoreBadgeProps {
  label: string
  score: string
  className?: string
}

export function ScoreBadge({ label, score, className }: ScoreBadgeProps) {
  const getScoreColor = (score: string) => {
    if (score == "High") return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
    if (score == "Med") return "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
    return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
  }

  return (
    <Badge className={cn("px-2 py-1 text-xs font-medium", getScoreColor(score), className)}>
      {label}: {score}
    </Badge>
  )
}
