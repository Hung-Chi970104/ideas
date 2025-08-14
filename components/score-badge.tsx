import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ScoreBadgeProps {
  label: string
  score: number
  className?: string
}

export function ScoreBadge({ label, score, className }: ScoreBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
    if (score >= 6) return "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
    return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
  }

  const getScoreText = (score: number) => {
    if (score >= 8) return "High"
    if (score >= 6) return "Med"
    return "Low"
  }

  return (
    <Badge className={cn("px-2 py-1 text-xs font-medium", getScoreColor(score), className)}>
      {label}: {getScoreText(score)}
    </Badge>
  )
}
