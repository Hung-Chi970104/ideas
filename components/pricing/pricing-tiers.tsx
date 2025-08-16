"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

type Tier = {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: string
  popular?: boolean
}

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cta: "Your current plan",
    description: "Intelligence for everyday tasks",
    features: [
      "5 Custom Idea Generations",
      "Basic Roadmap Templates",
      "Community support",
      "Email notifications"
    ],
  },
  {
    name: "Plus",
    price: "$20",
    period: "USD / month",
    cta: "Get Plus",
    description: "More access to advanced intelligence",
    features: [
      "Unlimited Idea Generation",
      "Advanced Roadmap Customization",
      "Market Validation Tools",
      "Priority Support",
      "Export to PDF/Notion",
      "Team Collaboration (Max. 4)",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: "$200",
    period: "USD / month",
    cta: "Get Pro",
    description: "Full access to the best of ChatGPT",
    features: [
      "Everything in Plus",
      "Unlimited Team Members",
      "Custom Integrations",
      "Dedicated Account Manager",
      "Advanced Analytics",
      "SLA Guaranteed",
  "Unlimited subject to abuse guardrails.",
    ],
  },
]

export function PricingTiers() {
  const [plan, setPlan] = useState<"personal" | "business">("personal")

  return (
    <section className="py-8 relative">
      <div className="max-w-6xl mx-auto mb-6 text-center">
        <div className="inline-flex items-center rounded-full border border-border p-1 bg-muted/30">
          <button
            type="button"
            onClick={() => setPlan("personal")}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
              plan === "personal" ? "bg-background border border-border" : "text-muted-foreground"
            }`}
          >
            Personal
          </button>
          <button
            type="button"
            onClick={() => setPlan("business")}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
              plan === "business" ? "bg-background border border-border" : "text-muted-foreground"
            }`}
          >
            Business
          </button>
        </div>

        {plan === "business" && (
          <div className="mt-6 max-w-md mx-auto p-4 border border-border rounded-lg bg-muted/30 text-left">
            <h3 className="text-lg font-semibold">Contact us</h3>
            <p className="text-sm text-muted-foreground mt-1">Contact us for more information about Business plans.</p>
            <div className="mt-3">
              <a
                href="/contact"
                className="inline-block px-4 py-2 rounded-full bg-primary text-white text-sm font-medium"
              >
                Contact us
              </a>
            </div>
          </div>
        )}
      </div>

      {plan === "personal" && (
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {tiers.map((tier) => {
          const isPopular = !!tier.popular
          const isCurrent = tier.cta.toLowerCase().includes("current")
          const displayPrice = tier.price?.toString().startsWith("$") ? tier.price.toString().slice(1) : tier.price

          return (
            <Card
              key={tier.name}
              className={`relative flex flex-col h-full rounded-2xl transition-transform max-w-sm ${
                isPopular
                  ? "border-primary/70 shadow-2xl hover:translate-y-[-2px]"
                  : "border-border/70 hover:translate-y-[-2px]"
              }`}
            >

              <CardHeader className="text-left pb-2">
                <CardTitle className="text-3xl font-heading">{tier.name}</CardTitle>
                {isPopular && (
                  <div className="absolute right-6">
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mt-5 text-left w-full">
                  <div className="flex items-baseline gap-2 justify-start">
                    <span className="relative inline-block">
                      <span className="absolute -left-2 text-2xl text-muted-foreground font-normal" aria-hidden>$</span>
                      <span className="text-5xl ml-2 font-bold font-heading leading-none">{displayPrice}</span>
                    </span>
                    {tier.period && (
                      <span className="ml-2 text-sm text-muted-foreground">{tier.period}</span>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mt-4">{tier.description}</p>
                
                <div className="mt-4 flex justify-center">
                  <Button
                    className="w-72 rounded-full"
                    variant={isPopular ? "default" : "outline"}
                    disabled={isCurrent}
                    aria-label={`${tier.cta} - ${tier.name}`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 pt-4">
                <ul className="space-y-3">
                  {tier.features.map((feature) => {
                    const isProNote = tier.name === "Pro" && feature.toLowerCase().includes("unlimited subject to abuse")
                    if (isProNote) {
                      return (
                        <li key={feature} className="pt-12 text-xs text-muted-foreground">
                          <span>{feature}</span>
                        </li>
                      )
                    }

                    return (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-4 w-4 mt-1 text-primary" />
                        <span className="text-sm leading-6">{feature}</span>
                      </li>
                    )
                  })}
                </ul>
              </CardContent>

              {/* CardFooter removed — CTA moved into header above description */}
            </Card>
          )
          })}
        </div>
      )}
    </section>
  )
}
