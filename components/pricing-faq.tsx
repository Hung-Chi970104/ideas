import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the free plan work?",
    answer:
      "The Starter plan gives you 5 idea generations per month with basic roadmap templates. Perfect for testing out Spark and exploring your first startup concepts.",
  },
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
  },
  {
    question: "What's included in idea generation?",
    answer:
      "Each generation includes a complete startup idea with market analysis, target audience insights, technical roadmap, and feasibility scoring.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment in full.",
  },
  {
    question: "Is there a team discount?",
    answer:
      "Enterprise plans include unlimited team members. For custom team pricing on Pro plans, contact our sales team.",
  },
  {
    question: "How accurate are the market validations?",
    answer:
      "Our AI analyzes real market data, trends, and competitor landscapes. While highly accurate, we recommend additional research for major business decisions.",
  },
]

export function PricingFAQ() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold font-heading text-center mb-12">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
