"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles } from "lucide-react"
import { ResizablePanes } from "@/components/chat/resizable-panes"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  chips?: string[]
}

interface IdeaDraft {
  projectName: string
  oneLinePitch: string
  targetAudience: string
  problemStatement: string
  whyItMatters: string
  skillsAndSignals: string[]
  suggestedTechStack: string[]
  keyRisks: string[]
  draftRoadmap: { milestone: string; weeks: number }[]
}

const initialQuestions = [
  {
    question: "Who do you want this project to help?",
    chips: ["Developers", "Small businesses", "Students", "Content creators", "E-commerce", "Healthcare"],
  },
]

export function SparkChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Let's build something that'll make your resume shine! Who do you want this project to help?",
      chips: ["Developers", "Small businesses", "Students", "Content creators", "E-commerce", "Healthcare"],
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [ideaDraft, setIdeaDraft] = useState<IdeaDraft>({
    projectName: "",
    oneLinePitch: "",
    targetAudience: "",
    problemStatement: "",
    whyItMatters: "",
    skillsAndSignals: [],
    suggestedTechStack: [],
    keyRisks: [],
    draftRoadmap: [],
  })

  const handleChipClick = (chip: string) => {
    handleSendMessage(chip)
  }

  const handleSendMessage = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response and update idea draft
    setTimeout(() => {
      const response = generateResponse(message, messages.length)
      setMessages((prev) => [...prev, response])
      updateIdeaDraft(message, messages.length)
    }, 1000)

    setInputValue("")
  }

  const generateResponse = (userInput: string, messageCount: number): Message => {
    const responses = [
      {
        content: "Great choice! What specific problem do they face that you could solve?",
        chips: [
          "Time management",
          "Cost efficiency",
          "Learning curve",
          "Communication",
          "Data organization",
          "Automation",
        ],
      },
      {
        content: "Perfect! What's your technical background? This helps me suggest the right tech stack.",
        chips: ["Frontend (React/Vue)", "Backend (Node/Python)", "Full-stack", "Mobile", "Data/ML", "DevOps"],
      },
      {
        content: "Excellent! How much time can you dedicate to this project?",
        chips: ["2-4 weeks", "1-2 months", "3-4 months", "6+ months"],
      },
    ]

    const responseIndex = Math.min(messageCount / 2, responses.length - 1)
    const response = responses[Math.floor(responseIndex)]

    return {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: response.content,
      chips: response.chips,
    }
  }

  const updateIdeaDraft = (userInput: string, messageCount: number) => {
    setIdeaDraft((prev) => {
      const updated = { ...prev }

      if (messageCount === 1) {
        updated.targetAudience = userInput
        updated.projectName = `${userInput} Helper Tool`
      } else if (messageCount === 3) {
        updated.problemStatement = userInput
        updated.whyItMatters = `Solving ${userInput.toLowerCase()} can significantly improve productivity and user experience`
      } else if (messageCount === 5) {
        updated.suggestedTechStack = userInput.includes("React")
          ? ["React", "TypeScript", "Tailwind"]
          : userInput.includes("Python")
            ? ["Python", "FastAPI", "PostgreSQL"]
            : ["Next.js", "TypeScript", "Prisma"]
        updated.skillsAndSignals = ["Full-stack development", "API design", "User experience", "Problem solving"]
      }

      return updated
    })
  }

  const leftPane = (
    <div className="flex flex-col h-full border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="font-semibold text-lg">SparkChat</h1>
          <Badge variant="secondary" className="text-xs">
            AI Mentor
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Let&apos;s build a resume-ready project together</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              {message.chips && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.chips.map((chip) => (
                    <Button
                      key={chip}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs bg-transparent"
                      onClick={() => handleChipClick(chip)}
                    >
                      {chip}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your answer..."
            onKeyPress={(e) => e.key === "Enter" && inputValue.trim() && handleSendMessage(inputValue)}
            className="flex-1"
          />
          <Button
            onClick={() => inputValue.trim() && handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const rightPane = (
    <div className="bg-card p-6 overflow-y-auto h-full">
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Idea Draft
          </h2>
        </div>

        <Card className="p-4 space-y-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Project Name</h3>
            <p className="text-sm">{ideaDraft.projectName || "TBD"}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">One-liner Pitch</h3>
            <p className="text-sm">{ideaDraft.oneLinePitch || "TBD"}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Target Audience</h3>
            <p className="text-sm">{ideaDraft.targetAudience || "TBD"}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Problem Statement</h3>
            <p className="text-sm">{ideaDraft.problemStatement || "TBD"}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Why it matters</h3>
            <p className="text-sm">{ideaDraft.whyItMatters || "TBD"}</p>
          </div>

          {ideaDraft.skillsAndSignals.length > 0 && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Skills & Resume Signals</h3>
              <div className="flex flex-wrap gap-1">
                {ideaDraft.skillsAndSignals.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {ideaDraft.suggestedTechStack.length > 0 && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Suggested Tech Stack</h3>
              <div className="flex flex-wrap gap-1">
                {ideaDraft.suggestedTechStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {ideaDraft.keyRisks.length > 0 && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Key Risks</h3>
              <ul className="text-sm space-y-1">
                {ideaDraft.keyRisks.map((risk, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {ideaDraft.draftRoadmap.length > 0 && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Draft Roadmap</h3>
              <div className="space-y-2">
                {ideaDraft.draftRoadmap.map((milestone, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{milestone.milestone}</span>
                    <Badge variant="outline" className="text-xs">
                      {milestone.weeks}w
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )

  return (
    <div className="h-screen bg-background">
      <ResizablePanes
        leftPane={leftPane}
        rightPane={rightPane}
        defaultLeftWidth={65}
        minLeftWidth={40}
        maxLeftWidth={75}
      />
    </div>
  )
}
