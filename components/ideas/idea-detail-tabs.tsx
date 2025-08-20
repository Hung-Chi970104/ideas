import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, TrendingUp, AlertTriangle, Zap, Code } from "lucide-react"
import { Doc } from "@/convex/_generated/dataModel"

interface IdeaDetailTabsProps {
  idea: Doc<"ideas">
}

export function IdeaDetailTabs({ idea }: IdeaDetailTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="proof">Proof</TabsTrigger>
        <TabsTrigger value="risks">Risks</TabsTrigger>
        <TabsTrigger value="scope">Tiny Scope v1</TabsTrigger>
        <TabsTrigger value="tech">Tech Stack</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Market Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Target Audience</h4>
              <p className="text-muted-foreground">{idea.targetAudience}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Pain Point</h4>
              <p className="text-muted-foreground">{idea.painPoint}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Why Now?</h4>
              <p className="text-muted-foreground">{idea.justification}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Project Solution</h4>
              <p className="text-muted-foreground">{idea.description}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="proof" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Market Validation
            </CardTitle>
            <CardDescription>Research and data supporting this opportunity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* {idea.citations.map((citation, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <h4 className="font-semibold">{citation.title}</h4>
                <p className="text-sm text-muted-foreground">{citation.snippet}</p>
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline inline-flex items-center gap-1"
                >
                  View source <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))} */}

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Additional Validation Needed</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Survey 50+ potential customers about current solutions</li>
                <li>• Analyze competitor pricing and feature gaps</li>
                <li>• Test landing page conversion rates</li>
                <li>• Conduct user interviews to validate pain points</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="risks" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Potential Risks & Challenges
            </CardTitle>
            <CardDescription>Key obstacles and mitigation strategies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700 dark:text-red-400">High Competition Risk</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Established players may have significant market share and resources
                </p>
                <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                  <strong>Mitigation:</strong> Focus on underserved niche, superior UX, or unique positioning
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-400">Technical Complexity</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Building a robust, scalable solution may require significant technical expertise
                </p>
                <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                  <strong>Mitigation:</strong> Start with MVP, use proven technologies, consider no-code solutions
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-700 dark:text-orange-400">Customer Acquisition</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Finding and converting target customers may be challenging and expensive
                </p>
                <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                  <strong>Mitigation:</strong> Content marketing, partnerships, referral programs, community building
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400">Market Timing</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Market may not be ready or trends could shift before product launch
                </p>
                <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                  <strong>Mitigation:</strong> Rapid prototyping, early user feedback, flexible product roadmap
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="scope" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Minimal Viable Product (MVP)
            </CardTitle>
            <CardDescription>The smallest version that delivers core value</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-lg border border-orange-500/20">
              <h4 className="font-semibold mb-2">Core MVP Scope</h4>
              <p className="text-muted-foreground">{idea.minimalViableProduct}</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Essential Features</h4>
              <div className="grid gap-3">
                {idea.essentialFeatures?.map((feature) => (
                  <div key={feature.featureTitle} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                    <div>
                      <h5 className="font-medium">{feature.featureTitle}</h5>
                      <p className="text-sm text-muted-foreground">{feature.featureDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="space-y-4">
              <h4 className="font-semibold">Features to Skip (v1)</h4>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  Advanced analytics and reporting
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  Team collaboration features
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  Mobile app (web-first approach)
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  Advanced customization options
                </div>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tech" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Technical Implementation
            </CardTitle>
            <CardDescription>Recommended technology stack and architecture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold">Frontend</h4>
                <div className="space-y-2">
                  {idea.techStack.frontend.map((tech) => (
                      <Badge key={tech} variant="secondary" className="mr-2">
                        {tech}
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Backend</h4>
                <div className="space-y-2">
                  {idea.techStack.backend.map((tech) => (
                      <Badge key={tech} variant="secondary" className="mr-2">
                        {tech}
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Database</h4>
                <div className="space-y-2">
                  {idea.techStack.database.map((tech) => (
                      <Badge key={tech} variant="secondary" className="mr-2">
                        {tech}
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Hosting</h4>
                <div className="space-y-2">
                  {idea.techStack.hosting.map((tech) => (
                      <Badge key={tech} variant="secondary" className="mr-2">
                        {tech}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Architecture Considerations</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium mb-1">Scalability</h5>
                  <p className="text-sm text-muted-foreground">
                    Start with serverless functions, move to containers as you scale
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium mb-1">Security</h5>
                  <p className="text-sm text-muted-foreground">
                    Implement authentication, input validation, and secure API endpoints from day one
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium mb-1">Performance</h5>
                  <p className="text-sm text-muted-foreground">
                    Use CDN for static assets, implement caching, optimize database queries
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
