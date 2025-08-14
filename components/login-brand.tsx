import Image from "next/image"
import Link from "next/link"

export function LoginBrand() {
  return (
    <div className="w-full max-w-lg mx-auto px-8 py-12">
      <div className="text-center lg:text-left">
        
        <Link href={'/'} className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
          <Image src="/logo.png" alt="Spark Logo" width={48} height={48} className="rounded-full" />
          <span className="text-3xl font-bold font-heading">Spark</span>
        </Link>

        <h1 className="text-4xl font-bold font-heading mb-6 leading-tight">Here's to your next spark in innovation!</h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          Transform your unique skills and interests into profitable startup opportunities. Join thousands of
          entrepreneurs who've discovered their next big idea with AI-powered insights.
        </p>

        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-center lg:justify-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
            <span className="text-sm text-muted-foreground">Personalized idea generation</span>
          </div>
          <div className="flex items-center justify-center lg:justify-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
            <span className="text-sm text-muted-foreground">Market validation insights</span>
          </div>
          <div className="flex items-center justify-center lg:justify-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
            <span className="text-sm text-muted-foreground">6-week launch roadmaps</span>
          </div>
        </div>
      </div>
    </div>
  )
}
