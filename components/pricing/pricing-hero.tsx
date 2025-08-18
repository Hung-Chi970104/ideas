"use client"
import Link from "next/link"

export function PricingHero() {
  return (
    <section className="text-center pt-12 md:pt-24">
      <div className="max-w-3xl mx-auto">
      <Link href="/" className="absolute top-6 right-6 rounded-md p-1" aria-label="Close and go to chat">
        <span className="text-3xl leading-none">×</span>
      </Link>
        <h1 className="text-4xl md:text-3xl font-heading mb-6">Upgrade your plan</h1>
        <p className="text-sm text-muted-foreground">Choose a plan below to get started.</p>
      </div>
    </section>
  )
}
