import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingCTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-2xl p-12 border border-primary/20">
          <h2 className="text-3xl font-bold font-heading mb-4">Ready to spark your next big idea?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of entrepreneurs who've discovered their winning startup concepts with Spark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
