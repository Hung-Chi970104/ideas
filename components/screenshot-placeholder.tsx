import { Card } from "@/components/ui/card"

export function ScreenshotPlaceholder() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur">
            <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold font-heading mb-2">See Spark in Action</h3>
                <p className="text-muted-foreground">
                  Interactive demo showing the complete idea generation and roadmap creation process
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
