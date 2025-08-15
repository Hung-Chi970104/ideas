"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	AudioLines,
	ChevronDown,
	LibraryBig,
	ListPlus,
	Menu,
	Mic,
	Plus,
	Search,
	Settings,
	Sparkles,
	Star,
	User2,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MindNode {
	id: string
	label: string
	x: number
	y: number
	size?: "lg" | "md" | "sm"
	group?: string
	parentId?: string | null
	color?: string
	shape?: "pill" | "rect" | "note" | "image"
	collapsed?: boolean
	emoji?: string
	src?: string
}

interface Group {
	id: string
	label: string
	x: number
	y: number
}

interface Edge {
	id: string
	from: string
	to: string
	label?: string
	dashed?: boolean
}

// Seed template: common headings + options
const groups: Group[] = [
	{ id: "tech", label: "Tech Stack", x: 0, y: 0 },
	{ id: "ui", label: "UI", x: 480, y: -60 },
	{ id: "aud", label: "Target Audience", x: -520, y: -180 },
	{ id: "data", label: "Database", x: -520, y: 160 },
	{ id: "deploy", label: "Hosting", x: 520, y: 220 },
	{ id: "ai", label: "AI", x: 0, y: -340 },
]

const initialNodes: MindNode[] = [
	// Tech (large first-tier)
	{ id: "python", label: "Python", x: 180, y: 0, size: "lg", group: "tech" },
	{ id: "js", label: "JavaScript", x: -40, y: 160, size: "lg", group: "tech" },
	{ id: "ts", label: "TypeScript", x: -40, y: -160, size: "lg", group: "tech" },
	// Tech (smaller)
	{ id: "java", label: "Java", x: 280, y: -120, size: "sm", group: "tech" },
	{ id: "cpp", label: "C++", x: 280, y: 120, size: "sm", group: "tech" },
	{ id: "csharp", label: "C#", x: 100, y: 220, size: "sm", group: "tech" },
	{ id: "ruby", label: "Ruby", x: -200, y: 60, size: "sm", group: "tech" },
	{ id: "php", label: "PHP", x: -260, y: -80, size: "sm", group: "tech" },

	// UI
	{ id: "tailwind", label: "Tailwind", x: 560, y: -40, group: "ui", size: "lg" },
	{ id: "shadcn", label: "shadcn/ui", x: 420, y: -140, group: "ui", size: "md" },
	{ id: "mui", label: "Material UI", x: 640, y: -140, group: "ui", size: "md" },
	{ id: "chakra", label: "Chakra", x: 420, y: 40, group: "ui", size: "sm" },
	{ id: "radix", label: "Radix", x: 700, y: 40, group: "ui", size: "sm" },

	// Audience
	{ id: "devs", label: "Developers", x: -640, y: -240, group: "aud", size: "lg" },
	{ id: "smb", label: "Small Business", x: -420, y: -260, group: "aud", size: "md" },
	{ id: "enterprise", label: "Enterprise", x: -520, y: -360, group: "aud", size: "md" },
	{ id: "edu", label: "Education", x: -760, y: -180, group: "aud", size: "sm" },

	// Database
	{ id: "pg", label: "PostgreSQL", x: -560, y: 160, group: "data", size: "lg" },
	{ id: "mysql", label: "MySQL", x: -700, y: 240, group: "data", size: "md" },
	{ id: "mongo", label: "MongoDB", x: -460, y: 260, group: "data", size: "md" },
	{ id: "sqlite", label: "SQLite", x: -720, y: 80, group: "data", size: "sm" },
	{ id: "redis", label: "Redis", x: -420, y: 80, group: "data", size: "sm" },

	// Deploy
	{ id: "vercel", label: "Vercel", x: 560, y: 240, group: "deploy", size: "lg" },
	{ id: "netlify", label: "Netlify", x: 680, y: 300, group: "deploy", size: "sm" },
	{ id: "aws", label: "AWS", x: 460, y: 340, group: "deploy", size: "md" },
	{ id: "gcp", label: "GCP", x: 620, y: 420, group: "deploy", size: "sm" },

	// AI
	{ id: "openai", label: "OpenAI", x: 40, y: -440, group: "ai", size: "lg" },
	{ id: "anthropic", label: "Anthropic", x: -180, y: -420, group: "ai", size: "md" },
	{ id: "local", label: "Local LLM", x: 220, y: -420, group: "ai", size: "sm" },
	{ id: "vector", label: "Vector DB", x: -40, y: -540, group: "ai", size: "sm" },
]

type Snap = { ts: number; nodes: MindNode[]; edges: Edge[] }

function usePanZoom() {
	const [offset, setOffset] = useState({ x: 0, y: 0 })
	const [scale, setScale] = useState(1)
	const dragging = useRef<null | { x: number; y: number }>(null)
	const pinchRef = useRef<{ d?: number } | null>(null)
	const shouldIgnoreTarget = (target: EventTarget | null) => {
		if (!(target instanceof Element)) return false
		// Ignore drags starting on nodes or interactive UI elements
		if (target.closest('[data-node]')) return true
		if (target.closest('input, textarea, select, button, [contenteditable], [data-stop-pan]')) return true
		return false
	}

	const onMouseDown = (e: React.MouseEvent) => {
		if (shouldIgnoreTarget(e.target)) return
		dragging.current = { x: e.clientX, y: e.clientY }
		;(e.currentTarget as HTMLElement).style.cursor = "grabbing"
	}
	const onMouseMove = (e: React.MouseEvent) => {
		if (!dragging.current) return
		const dx = e.clientX - dragging.current.x
		const dy = e.clientY - dragging.current.y
		dragging.current = { x: e.clientX, y: e.clientY }
		setOffset((o) => ({ x: o.x + dx, y: o.y + dy }))
	}
	const onMouseUp = (e: React.MouseEvent) => {
		dragging.current = null
		;(e.currentTarget as HTMLElement).style.cursor = "grab"
	}
	const onWheel = (e: React.WheelEvent) => {
		if (!e.ctrlKey) return
		e.preventDefault()
		setScale((s) => Math.min(1.6, Math.max(0.6, s - e.deltaY * 0.001)))
	}

	// Touch support
	const onTouchStart = (e: React.TouchEvent) => {
		if (e.touches.length === 1) {
			if (shouldIgnoreTarget(e.target)) return
			const t = e.touches[0]
			dragging.current = { x: t.clientX, y: t.clientY }
		} else if (e.touches.length === 2) {
			const [a, b] = [e.touches[0], e.touches[1]]
			const dx = a.clientX - b.clientX
			const dy = a.clientY - b.clientY
			pinchRef.current = { d: Math.hypot(dx, dy) }
		}
	}
	const onTouchMove = (e: React.TouchEvent) => {
		if (e.touches.length === 1 && dragging.current) {
			const t = e.touches[0]
			const dx = t.clientX - dragging.current.x
			const dy = t.clientY - dragging.current.y
			dragging.current = { x: t.clientX, y: t.clientY }
			setOffset((o) => ({ x: o.x + dx, y: o.y + dy }))
		} else if (e.touches.length === 2 && pinchRef.current?.d) {
			const [a, b] = [e.touches[0], e.touches[1]]
			const dx = a.clientX - b.clientX
			const dy = a.clientY - b.clientY
			const d = Math.hypot(dx, dy)
			const delta = d / (pinchRef.current.d || d)
			setScale((s) => Math.min(1.6, Math.max(0.6, s * delta)))
			pinchRef.current.d = d
		}
	}
	const onTouchEnd = () => {
		dragging.current = null
		pinchRef.current = null
	}

	return { offset, scale, setScale, onMouseDown, onMouseMove, onMouseUp, onWheel, onTouchStart, onTouchMove, onTouchEnd }
}

function Node({ node, selected, scale, onToggle, onDrag }: { node: MindNode; selected: boolean; scale: number; onToggle: (id: string) => void; onDrag: (id: string, dx: number, dy: number) => void }) {
	const size = node.size ?? "md"
	const cls = cn(
		"absolute select-none border text-foreground/90 shadow-sm will-change-transform touch-none",
		node.shape === "note" ? "rounded-md" : "rounded-full",
		selected ? "bg-primary/15 border-primary" : "bg-background/70 border-border/50",
		size === "lg" && "px-4 py-2 text-sm",
		size === "md" && "px-3 py-1.5 text-[13px]",
		size === "sm" && "px-2.5 py-1 text-[12px] opacity-90"
	)
	const elRef = useRef<HTMLButtonElement | null>(null)
	const startRef = useRef<{ x: number; y: number; moved: boolean } | null>(null)
	const accRef = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 })
	const rafRef = useRef<number | null>(null)

	const applyTransform = useCallback(() => {
		if (!elRef.current) return
		const { dx, dy } = accRef.current
		// Convert pointer pixel movement into canvas units
		const tx = dx / scale
		const ty = dy / scale
		elRef.current.style.transform = `translate(${tx}px, ${ty}px)`
		rafRef.current = null
	}, [scale])

	const schedule = () => {
		if (rafRef.current == null) {
			rafRef.current = requestAnimationFrame(applyTransform)
		}
	}
	return (
		<button
			ref={elRef}
			style={{ left: node.x, top: node.y, backgroundColor: node.color }}
			className={cls}
			data-node
			onClick={(e) => {
				e.stopPropagation()
				// Suppress toggle if a drag occurred
				if (!startRef.current || !startRef.current.moved) {
					onToggle(node.id)
				}
			}}
			onPointerDown={(e) => {
				e.stopPropagation()
				const el = elRef.current
				if (!el) return
				// Capture pointer on the button itself
				e.currentTarget.setPointerCapture?.(e.pointerId)
				// Prevent scrolling on touch while dragging
				el.style.touchAction = "none"
				startRef.current = { x: e.clientX, y: e.clientY, moved: false }
				accRef.current = { dx: 0, dy: 0 }
			}}
			onPointerMove={(e) => {
				if (!startRef.current) return
				const dx = e.clientX - startRef.current.x
				const dy = e.clientY - startRef.current.y
				// small threshold to avoid accidental drags
				if (!startRef.current.moved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
					startRef.current.moved = true
				}
				accRef.current = { dx, dy }
				schedule()
			}}
			onPointerUp={(e) => {
				if (!startRef.current) return
				const { dx, dy } = accRef.current
				// Commit final position update in canvas units and clear transform
				if (startRef.current.moved) {
					onDrag(node.id, dx / scale, dy / scale)
				}
				startRef.current = null
				accRef.current = { dx: 0, dy: 0 }
				if (elRef.current) elRef.current.style.transform = ""
				if (elRef.current) elRef.current.style.touchAction = ""
				// Release pointer capture
				e.currentTarget.releasePointerCapture?.(e.pointerId)
				if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
				rafRef.current = null
			}}
		>
			<span className="pointer-events-none">
				{node.emoji ? node.emoji + " " : null}
				{node.label}
			</span>
		</button>
	)
}

function GroupLabel({ g }: { g: Group }) {
	return (
		<div
			style={{ left: g.x, top: g.y }}
			className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md bg-secondary/60 px-3 py-1 text-xs font-semibold tracking-wide text-secondary-foreground border border-border/40 shadow-sm"
		>
			{g.label}
		</div>
	)
}

export default function ChatPage() {
	const [nodes, setNodes] = useState<MindNode[]>(initialNodes)
	const [edges, setEdges] = useState<Edge[]>([])
	const [selected, setSelected] = useState<Record<string, boolean>>({})
	const [activeId, setActiveId] = useState<string | null>(null)
	const [linkFrom, setLinkFrom] = useState<string | null>(null)
	const [quickNote, setQuickNote] = useState(false)
	const [search, setSearch] = useState("")
	const [menuOpen, setMenuOpen] = useState(true)
	const { offset, scale, setScale, onMouseDown, onMouseMove, onMouseUp, onWheel, onTouchStart, onTouchMove, onTouchEnd } = usePanZoom()

	const addLanguage = useCallback((label: string) => {
		const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-")
		if (nodes.some((n) => n.id === id)) return
		const angle = Math.random() * Math.PI * 2
		const r = 260 + Math.random() * 120
		const nx = Math.cos(angle) * r
		const ny = Math.sin(angle) * r
		setNodes((prev) => [...prev, { id, label, x: nx, y: ny, size: "sm", group: "tech" }])
		setSearch("")
	}, [nodes])

	const filteredSuggestions = useMemo(() => {
		const existing = new Set(nodes.filter((n) => n.group === "tech").map((n) => n.label.toLowerCase()))
		return ["Go", "Rust", "Kotlin", "Swift", "Elixir", "Dart", "Scala", "Haskell"].filter((l) => l.toLowerCase().includes(search.toLowerCase()) && !existing.has(l.toLowerCase()))
	}, [search, nodes])

	const toggle = (id: string) => {
		setSelected((s) => ({ ...s, [id]: !s[id] }))
		setActiveId(id)
	}

	// Drag handled inline in Node usage for responsiveness

	// Create at position
	const createAt = (xClient: number, yClient: number) => {
		const x = (xClient - offset.x) / scale
		const y = (yClient - offset.y) / scale
		const id = `n${Date.now().toString(36)}`
		const newNode: MindNode = {
			id,
			label: quickNote ? "Note" : "New Idea",
			x,
			y,
			size: "md",
			shape: quickNote ? "note" : "pill",
			color: quickNote ? "#FDE68A" : undefined,
		}
		setNodes((prev) => [...prev, newNode])
		setSelected({ [id]: true })
		setActiveId(id)
	}

	// Keyboard shortcuts
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const selId = activeId || Object.keys(selected).find((k) => selected[k])
			if ((e.key === "Enter" || e.key.toLowerCase() === "n") && !e.shiftKey) {
				e.preventDefault()
				const base = selId ? nodes.find((n) => n.id === selId) : undefined
				const id = `n${Date.now().toString(36)}`
				const newNode: MindNode = {
					id,
					label: "Idea",
					x: (base?.x ?? 0) + 80,
					y: (base?.y ?? 0) + 40,
					size: "md",
				}
				setNodes((prev) => [...prev, newNode])
				setSelected({ [id]: true })
				setActiveId(id)
			}
			if (e.key === "Tab") {
				if (!selId) return
				e.preventDefault()
				const base = nodes.find((n) => n.id === selId)!
				const id = `n${Date.now().toString(36)}`
				const child: MindNode = { id, label: "Child", x: base.x + 140, y: base.y, size: "sm", parentId: base.id }
				setNodes((prev) => [...prev, child])
				setEdges((es) => [...es, { id: `e${Date.now().toString(36)}`, from: base.id, to: id }])
				setSelected({ [id]: true })
				setActiveId(id)
			}
			if (e.key.toLowerCase() === "z" && (e.ctrlKey || e.metaKey)) {
				e.preventDefault()
				const snaps = JSON.parse(localStorage.getItem("spark.mindmap.snapshots") || "[]") as Snap[]
				const last = snaps.pop()
				if (last) {
					localStorage.setItem("spark.mindmap.snapshots", JSON.stringify(snaps))
					setNodes(last.nodes)
					setEdges(last.edges)
				}
			}
			if (e.key === "+" || (e.key === "=" && (e.ctrlKey || e.metaKey))) {
				e.preventDefault()
				setScale((s) => Math.min(1.6, s + 0.1))
			}
			if (e.key === "-" && (e.ctrlKey || e.metaKey)) {
				e.preventDefault()
				setScale((s) => Math.max(0.6, s - 0.1))
			}
			if ((e.key === "Backspace" || e.key === "Delete") && selId) {
				e.preventDefault()
				setNodes((prev) => prev.filter((n) => n.id !== selId))
				setEdges((prev) => prev.filter((e) => e.from !== selId && e.to !== selId))
				setActiveId(null)
				setSelected({})
			}
		}
		window.addEventListener("keydown", handler)
		return () => window.removeEventListener("keydown", handler)
	}, [activeId, selected, nodes, setScale])

	// Autosave + restore
	useEffect(() => {
		const payload = { nodes, edges }
		localStorage.setItem("spark.mindmap.v1", JSON.stringify(payload))
	}, [nodes, edges])
	useEffect(() => {
		const raw = localStorage.getItem("spark.mindmap.v1")
		if (raw) {
			try {
				const { nodes: n, edges: e } = JSON.parse(raw)
				if (Array.isArray(n)) setNodes(n)
				if (Array.isArray(e)) setEdges(e)
			} catch {}
		}
	}, [])

	const saveSnapshot = () => {
			const snaps = JSON.parse(localStorage.getItem("spark.mindmap.snapshots") || "[]") as Snap[]
			snaps.push({ ts: Date.now(), nodes, edges })
			while (snaps.length > 20) snaps.shift()
			localStorage.setItem("spark.mindmap.snapshots", JSON.stringify(snaps))
	}

	const bgStyle: React.CSSProperties = {
		backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1.2px, transparent 1.2px)",
		backgroundSize: `${96}px ${96}px`,
	}

	return (
		<div className="min-h-screen w-full bg-background text-foreground flex">
			{/* Left Sidebar */}
			<aside
				className={cn(
					"transition-all border-r border-border/40 bg-secondary/30 backdrop-blur sticky top-0 h-screen overflow-hidden",
					menuOpen ? "w-72" : "w-[72px]"
				)}
			>
				<div className="flex items-center gap-3 px-4 h-14 border-b border-border/40">
					<button className="p-2 rounded-md hover:bg-accent" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
						<Menu className="size-5" />
					</button>
					{menuOpen && (
						<div className="flex items-center gap-2">
							<Image src="/logo.png" alt="logo" width={24} height={24} className="rounded" />
							<span className="font-semibold">Spark Chat</span>
						</div>
					)}
				</div>
				<div className="h-[calc(100vh-56px)] overflow-y-auto px-3 py-3 space-y-6">
					<div>
						<Button variant="secondary" size="sm" className="w-full justify-start gap-2">
							<Plus className="size-4" />{menuOpen && <span>New chat</span>}
						</Button>
						<div className="mt-2">
							<div className="relative">
								<Input placeholder={menuOpen ? "Search chats" : "Search"} className="pl-8" />
								<Search className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
							</div>
						</div>
					</div>

					{menuOpen && (
						<div className="space-y-2">
							<div className="text-xs font-semibold uppercase text-muted-foreground px-1">Library</div>
							<SidebarItem icon={<LibraryBig className="size-4" />} label="Library" />
							<SidebarItem icon={<Sparkles className="size-4" />} label="Sora" />
							<div className="text-xs font-semibold uppercase text-muted-foreground px-1 mt-4">GPTs</div>
							<SidebarItem icon={<Star className="size-4" />} label="Pain Point Finder" />
							<SidebarItem icon={<Star className="size-4" />} label="Three.js Mentor" />
							<div className="text-xs font-semibold uppercase text-muted-foreground px-1 mt-4">Chats</div>
							<SidebarItem icon={<ListPlus className="size-4" />} label="Spark is the best" />
							<SidebarItem icon={<ListPlus className="size-4" />} label="Spark collobrates with you" />
							<SidebarItem icon={<ListPlus className="size-4" />} label="Spark is a unique ideation tool" />
							<SidebarItem icon={<ListPlus className="size-4" />} label="Spark will spark your next startup" />
						</div>
					)}

					<div className="pt-6 border-t border-border/40">
						<SidebarItem icon={<User2 className="size-4" />} label="Ryan_thecooliokid" trailing={menuOpen ? <span className="text-xs px-2 py-0.5 rounded bg-accent text-muted-foreground">Free</span> : null} />
						{menuOpen && <SidebarItem icon={<Settings className="size-4" />} label="Settings" />}
					</div>
				</div>
			</aside>

			{/* Main Area */}
			<main className="flex-1 relative">
				<div className="h-14 border-b border-border/40 flex items-center justify-between px-4 sticky top-0 bg-background/80 backdrop-blur z-10">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<span>Welcome back</span>
						<ChevronDown className="size-4" />
					</div>
					<Button size="sm" className="shadow-md">
						Upgrade your plan
					</Button>
				</div>

				{/* Canvas area */}
				<div className="relative h-[calc(100vh-56px-92px)]" style={bgStyle}
					onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onWheel={onWheel}
					onDoubleClick={(e) => createAt(e.clientX, e.clientY)}
					onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
					onDragOver={(e) => e.preventDefault()}
					onDrop={(e) => {
						e.preventDefault()
						const file = e.dataTransfer.files?.[0]
						if (file && file.type.startsWith("image/")) {
							const reader = new FileReader()
							reader.onload = () => {
								const x = e.clientX
								const y = e.clientY
								const id = `img${Date.now().toString(36)}`
								const nx = (x - offset.x) / scale
								const ny = (y - offset.y) / scale
								setNodes((prev) => [
									...prev,
									{ id, label: "Image", x: nx, y: ny, shape: "image", size: "md", src: String(reader.result) },
								])
							}
							reader.readAsDataURL(file)
						}
					}}
				>
					{/* Search to add uncommon languages */}
					<div className="absolute left-1/2 -translate-x-1/2 top-3 z-10 w-[min(560px,90%)]">
						<div className="relative">
							<Input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search tech stack (e.g., Go, Rust) and press Enter to add"
								onKeyDown={(e) => {
									if (e.key === "Enter" && search.trim()) addLanguage(search.trim())
								}}
								className="pl-8 pr-8 bg-background/80 backdrop-blur"
							/>
							<Search className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
							{search && (
								<Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setSearch("")}>×</Button>
							)}
						</div>
						{filteredSuggestions.length > 0 && (
							<div className="mt-2 rounded-md border border-border/50 bg-background/90 backdrop-blur shadow-sm p-1 grid grid-cols-2 sm:grid-cols-4 gap-1">
								{filteredSuggestions.map((s) => (
									<button key={s} onClick={() => addLanguage(s)} className="px-2 py-1 text-xs rounded bg-secondary/50 hover:bg-secondary/70 border border-border/40">
										Add {s}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Scalable layer */}
					<div
						className="absolute inset-0"
						style={{
							transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
							transformOrigin: "0 0",
							cursor: "grab",
						}}
					>
						{/* zoom helpers */}
						<div className="absolute right-6 top-6 flex flex-col gap-1 text-xs bg-background/70 backdrop-blur border border-border/50 rounded-md shadow-sm">
							<button className="px-2 py-1 hover:bg-accent" onClick={() => setScale((s) => Math.min(1.6, s + 0.1))}>+</button>
							<button className="px-2 py-1 hover:bg-accent" onClick={() => setScale((s) => Math.max(0.6, s - 0.1))}>-</button>
							<button className="px-2 py-1 hover:bg-accent" onClick={() => setScale(1)}>100%</button>
						</div>

						{/* connectors */}
						<svg className="absolute inset-0" width="100%" height="100%" viewBox="-1200 -900 2400 1800" preserveAspectRatio="none">
							{groups.map((g) => {
								const gNodes = nodes.filter((n) => n.group === g.id)
								return gNodes.map((n) => (
									<line key={`${g.id}-${n.id}`} x1={g.x} y1={g.y} x2={n.x} y2={n.y} stroke="currentColor" strokeOpacity={0.2} strokeWidth={1} />
								))
							})}
							{edges.map((e) => {
								const a = nodes.find((n) => n.id === e.from)
								const b = nodes.find((n) => n.id === e.to)
								if (!a || !b) return null
								return (
									<line key={e.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeOpacity={0.35} strokeWidth={2} strokeDasharray={e.dashed ? "4 4" : undefined} />
								)
							})}
						</svg>

						{/* group labels */}
						{groups.map((g) => (
							<GroupLabel key={g.id} g={{ ...g, x: g.x, y: g.y }} />
						))}

						{/* nodes */}
						{nodes.map((n) => (
							<Node key={n.id} node={n} selected={!!selected[n.id]} scale={scale} onToggle={(id) => {
								if (linkFrom && linkFrom !== id) {
									setEdges((es) => [...es, { id: `e${Date.now().toString(36)}`, from: linkFrom, to: id }])
									setLinkFrom(null)
								} else {
									toggle(id)
								}
							}} onDrag={(id, dx, dy) => {
								setNodes((prev) => prev.map((nn) => (nn.id === id ? { ...nn, x: nn.x + dx, y: nn.y + dy } : nn)))
							}} />
						))}

						{/* Floating node toolbar */}
						{activeId && (
							<NodeToolbar
								node={nodes.find((n) => n.id === activeId)!}
								onChange={(patch) => setNodes((prev) => prev.map((n) => (n.id === activeId ? { ...n, ...patch } : n)))}
								onStartLink={() => setLinkFrom(activeId)}
								onCollapse={() => setNodes((prev) => prev.map((n) => (n.id === activeId ? { ...n, collapsed: !n.collapsed } : n)))}
								onDelete={() => {
									setNodes((prev) => prev.filter((n) => n.id !== activeId))
									setEdges((prev) => prev.filter((e) => e.from !== activeId && e.to !== activeId))
									setActiveId(null)
									setSelected({})
								}}
								onSuggest={() => {
									const base = nodes.find((n) => n.id === activeId)!
									const ideas = ["Market fit", "Monetization", "UX polish", "Metrics", "Launch plan"]
									const picks = ideas.sort(() => 0.5 - Math.random()).slice(0, 3)
									const now = Date.now()
									setNodes((prev) => ([
										...prev,
										...picks.map((p, i): MindNode => ({ id: `s${now + i}`, label: p, x: base.x + 140, y: base.y + i * 40 - 40, size: "sm", parentId: base.id })),
									]))
									setEdges((es) => ([
										...es,
										...picks.map((_, i) => ({ id: `se${now + i}`, from: base.id, to: `s${now + i}` })),
									]))
								}}
								onSnapshot={() => {
									const snaps = JSON.parse(localStorage.getItem("spark.mindmap.snapshots") || "[]") as Snap[]
									snaps.push({ ts: Date.now(), nodes, edges })
									while (snaps.length > 20) snaps.shift()
									localStorage.setItem("spark.mindmap.snapshots", JSON.stringify(snaps))
								}}
							/>
						)}
					</div>
				</div>

				{/* Prompt bar */}
				<div className="sticky bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent pt-6 pb-6">
					<div className="mx-auto max-w-3xl px-4">
						<div className="rounded-xl border border-border/50 bg-background/80 backdrop-blur shadow-md p-2">
							<div className="flex items-center gap-2">
								<Button variant="ghost" size="icon" className="shrink-0"><Plus className="size-5" /></Button>
								<Input placeholder="What can I help with?" className="bg-transparent border-0 focus-visible:ring-0" />
								<Button variant="ghost" size="icon" className="shrink-0"><Mic className="size-5" /></Button>
								<Button variant="default" size="sm" className="shrink-0">Submit</Button>
							</div>
							<div className="flex justify-center gap-3 mt-2 text-xs text-muted-foreground">
								<span className="inline-flex items-center gap-1"><AudioLines className="size-3.5" /> Voice</span>
								<span className="inline-flex items-center gap-1"><Sparkles className="size-3.5" /> Tips: pick nodes above to prefill context</span>
							</div>
							<div className="flex items-center justify-between mt-2 text-xs">
								<div className="flex items-center gap-2">
									<label className="inline-flex items-center gap-2">
										<input type="checkbox" className="accent-current" checked={quickNote} onChange={(e) => setQuickNote(e.target.checked)} />
										Quick thoughts (sticky note)
									</label>
								</div>
								<div className="flex items-center gap-2">
									<Button variant="outline" size="sm" onClick={saveSnapshot}>Save snapshot</Button>
									<Button variant="outline" size="sm" onClick={() => {
										const data = { nodes, edges }
										const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
										const url = URL.createObjectURL(blob)
										const a = document.createElement("a")
										a.href = url
										a.download = "mindmap.json"
										a.click()
										URL.revokeObjectURL(url)
									}}>Export JSON</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

function SidebarItem({ icon, label, trailing }: { icon: React.ReactNode; label: string; trailing?: React.ReactNode }) {
	return (
		<div className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-md hover:bg-accent cursor-pointer text-sm">
			<div className="flex items-center gap-2 min-w-0">
				<span className="text-muted-foreground">{icon}</span>
				<span className="truncate">{label}</span>
			</div>
			{trailing}
		</div>
	)
}

function NodeToolbar({ node, onChange, onStartLink, onCollapse, onDelete, onSuggest, onSnapshot }: {
	node: MindNode
	onChange: (patch: Partial<MindNode>) => void
	onStartLink: () => void
	onCollapse: () => void
	onDelete: () => void
	onSuggest: () => void
	onSnapshot: () => void
}) {
	const colors = ["#93C5FD", "#A5B4FC", "#FCA5A5", "#FDE68A", "#86EFAC", "#F9A8D4"]
	return (
		<div style={{ left: node.x + 8, top: node.y - 44 }} className="absolute z-20 -translate-y-full rounded-md border border-border/50 bg-background/90 backdrop-blur shadow-md p-1 flex items-center gap-1 text-xs">
			<input
				value={node.label}
				onChange={(e) => onChange({ label: e.target.value })}
				className="bg-transparent border px-2 py-0.5 rounded"
			/>
			<button className="px-2 py-1 rounded hover:bg-accent" onClick={() => onStartLink()}>Link</button>
			<button className="px-2 py-1 rounded hover:bg-accent" onClick={() => onCollapse()}>{node.collapsed ? "Expand" : "Collapse"}</button>
			<button className="px-2 py-1 rounded hover:bg-accent" onClick={() => onSuggest()}>Suggest</button>
			<button className="px-2 py-1 rounded hover:bg-accent" onClick={() => onSnapshot()}>Snap</button>
			<button className="px-2 py-1 rounded hover:bg-destructive/20 text-destructive" onClick={() => onDelete()}>Delete</button>
			<div className="flex items-center gap-1 pl-1">
				{colors.map((c) => (
					<button key={c} title={c} onClick={() => onChange({ color: c })} style={{ backgroundColor: c }} className="size-4 rounded border" />
				))}
			</div>
		</div>
	)
}


