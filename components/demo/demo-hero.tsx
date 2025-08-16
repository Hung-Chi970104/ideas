import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function DemoHero() {
  return (
    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
          See Spark in{" "}
          <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">action</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Watch how Spark transforms your interests and skills into profitable startup ideas in minutes.
        </p>
        <Button size="lg" className="text-lg px-8">
          <Play className="mr-2 h-5 w-5" />
          Start Interactive Demo
        </Button>
      </div>
    </section>
  )
}
