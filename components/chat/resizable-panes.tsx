"use client"

import React from "react"

import { useState, useRef, useCallback, type ReactNode } from "react"

interface ResizablePanesProps {
  leftPane: ReactNode
  rightPane: ReactNode
  defaultLeftWidth?: number
  minLeftWidth?: number
  maxLeftWidth?: number
}

export function ResizablePanes({
  leftPane,
  rightPane,
  defaultLeftWidth = 60,
  minLeftWidth = 30,
  maxLeftWidth = 80,
}: ResizablePanesProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      const clampedWidth = Math.min(Math.max(newLeftWidth, minLeftWidth), maxLeftWidth)
      setLeftWidth(clampedWidth)
    },
    [isDragging, minLeftWidth, maxLeftWidth],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add global mouse event listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div ref={containerRef} className="flex h-full">
      {/* Left Pane */}
      <div style={{ width: `${leftWidth}%` }} className="flex flex-col">
        {leftPane}
      </div>

      <div
        className={`w-px bg-white/5 hover:bg-gradient-to-b hover:from-coral-400/30 hover:via-coral-500/50 hover:to-coral-400/30 cursor-col-resize transition-all duration-300 relative group ${
          isDragging ? "bg-gradient-to-b from-coral-400/40 via-coral-500/60 to-coral-400/40 w-0.5" : ""
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute inset-y-0 -left-2 -right-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-coral-400/60 to-transparent shadow-lg shadow-coral-400/20" />
        </div>
      </div>

      {/* Right Pane */}
      <div style={{ width: `${100 - leftWidth}%` }} className="flex flex-col">
        {rightPane}
      </div>
    </div>
  )
}
