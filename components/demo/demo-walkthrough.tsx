"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, ChevronLeft, Sparkles, Target, TrendingUp, Zap } from "lucide-react"

const demoSteps = [
  {
    title: "Tell us about yourself",
    description: "Share your skills, interests, and goals",
    component: "form",
  },
  {
    title: "AI analyzes your profile",
    description: "Our AI processes your information and market data",
    component: "processing",
  },
  {
    title: "Get personalized ideas",
    description: "Receive tailored startup concepts with detailed insights",
    component: "results",
  },
]

const sampleIdea = {
  title: "AI-Powered Fitness Meal Planner",
  description:
    "A personalized meal planning app that uses AI to create nutrition plans based on fitness goals, dietary restrictions, and local ingredient availability.",
  scores: {
    fit: 92,
    trend: 88,
    feasible: 85,
    niche: 78,
  },
  targetAudience: "Fitness enthusiasts aged 25-40 who want personalized nutrition without hiring expensive dietitians",
  painPoint:
    "People struggle to create meal plans that align with their fitness goals while accommodating dietary restrictions and budget constraints",
}

export function DemoWalkthrough() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleNext = () => {
    if (currentStep === 0) {
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep(currentStep + 1)
      }, 3000)
    } else if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {demoSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                {index < demoSteps.length - 1 && <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading">{demoSteps[currentStep].title}</CardTitle>
            <CardDescription>{demoSteps[currentStep].description}</CardDescription>
          </CardHeader>

          <CardContent>
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Your Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">UI/UX Design</Badge>
                      <Badge variant="secondary">Marketing</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Fitness</Badge>
                      <Badge variant="outline">Health Tech</Badge>
                      <Badge variant="outline">Mobile Apps</Badge>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Time Commitment</Label>
                    <Select defaultValue="part-time">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="part-time">Part-time (10-20 hrs/week)</SelectItem>
                        <SelectItem value="full-time">Full-time (40+ hrs/week)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Revenue Goal</Label>
                    <Select defaultValue="10k-50k">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10k-50k">$10K - $50K/month</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K/month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Input
                    placeholder="e.g., Small business owners, fitness enthusiasts..."
                    defaultValue="Fitness enthusiasts who want better nutrition"
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="text-center py-12">
                {isProcessing ? (
                  <div className="space-y-4">
                    <div className="animate-spin mx-auto">
                      <Sparkles className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-lg font-medium">Analyzing your profile...</p>
                    <p className="text-muted-foreground">Finding market opportunities that match your skills</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h3 className="font-medium">Market Analysis</h3>
                        <p className="text-sm text-muted-foreground">Identified 12 trending opportunities</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h3 className="font-medium">Skill Matching</h3>
                        <p className="text-sm text-muted-foreground">Found 8 perfect skill alignments</p>
                      </div>
                      <div className="text-center">
                        <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h3 className="font-medium">Feasibility Check</h3>
                        <p className="text-sm text-muted-foreground">Validated 5 high-potential ideas</p>
                      </div>
                    </div>
                    <p className="text-primary font-medium">Analysis complete! Ready to show your ideas.</p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{sampleIdea.title}</CardTitle>
                        <CardDescription className="mt-2">{sampleIdea.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Fit: {sampleIdea.scores.fit}%</Badge>
                        <Badge variant="secondary">Trend: {sampleIdea.scores.trend}%</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Target Audience</h4>
                        <p className="text-sm text-muted-foreground">{sampleIdea.targetAudience}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Pain Point</h4>
                        <p className="text-sm text-muted-foreground">{sampleIdea.painPoint}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">View Full Details</Button>
                        <Button size="sm" variant="outline">
                          Create Roadmap
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-center text-muted-foreground">
                  This is just one of 5 personalized ideas generated for your profile!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentStep === demoSteps.length - 1 || isProcessing}>
            {currentStep === demoSteps.length - 1 ? "Finish Demo" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
