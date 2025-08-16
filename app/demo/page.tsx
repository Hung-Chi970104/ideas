import { DemoHero } from "@/components/demo/demo-hero"
import { DemoWalkthrough } from "@/components/demo/demo-walkthrough"
import { DemoCTA } from "@/components/demo/demo-cta"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DemoHero />
        <DemoWalkthrough />
        <DemoCTA />
      </div>
    </div>
  )
}
