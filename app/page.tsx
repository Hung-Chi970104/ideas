import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeatureCards } from "@/components/feature-cards"
import { ScreenshotPlaceholder } from "@/components/screenshot-placeholder"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Hero />
          <FeatureCards />
          <ScreenshotPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  )
}
