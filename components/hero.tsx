import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-pink-400/20 rounded-3xl blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight font-heading sm:text-6xl lg:text-7xl">
            Spark your next{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">startup</span>{" "}
            today
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Transform your skills and interests into profitable startup ideas. Get AI-powered insights, market
            validation, and detailed roadmaps to turn your vision into reality.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/dashboard">Get started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 bg-transparent">
              <Link href="/demo">Live demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
