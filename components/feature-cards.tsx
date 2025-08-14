import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Map } from "lucide-react"

export function FeatureCards() {
  const features = [
    {
      icon: Lightbulb,
      title: "Niche Ideas",
      description:
        "Discover untapped market opportunities tailored to your unique skills and interests. Our AI analyzes thousands of data points to find profitable niches others miss.",
    },
    {
      icon: TrendingUp,
      title: "Proof-of-Pain",
      description:
        "Validate your ideas with real market data and user research. Get concrete evidence that people actually want what you're planning to build.",
    },
    {
      icon: Map,
      title: "Visual Roadmaps",
      description:
        "Transform ideas into actionable 6-week launch plans. Get step-by-step guidance with tasks, milestones, and success metrics to ship your MVP.",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight font-heading sm:text-4xl">Everything you need to launch</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From idea generation to market validation to execution planning
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-orange-500" />
                </div>
                <CardTitle className="text-xl font-heading">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
