"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MotionConfig, motion, useReducedMotion } from "motion/react"

import { fadeUp, stagger } from "@/lib/shell/motion"
import { cn } from "@/lib/utils"

/* CPOHQ divergence from the hive-shell registry item: CTAs may carry onClick
   (join modal) and an optional secondaryCta renders before the primary. */
export interface ShellNavbarCta {
  label: string
  href?: string
  onClick?: () => void
}

export interface ShellNavbarProps {
  /** Any aspect ratio — the nav constrains it, never the reverse. */
  logo: React.ReactNode
  links: { label: string; href: string }[]
  cta?: ShellNavbarCta
  secondaryCta?: ShellNavbarCta
  className?: string
}

/**
 * Brand surface — override these CSS variables via `className`:
 * --nav-height  bar height (default 64px, 72px ≥ md); the logo slot derives from it
 * --nav-bg      translucent bar background (default white @ 72%; keep alpha or the blur vanishes)
 * --nav-blur    backdrop blur radius (default 14px)
 * --nav-fg      bar foreground color (defaults to inherited text color)
 */
const emptySubscribe = () => () => {}

function CtaAction({
  cta,
  className,
  onNavigate,
}: {
  cta: ShellNavbarCta
  className: string
  onNavigate?: () => void
}) {
  if (cta.onClick) {
    return (
      <button
        type="button"
        onClick={() => {
          onNavigate?.()
          cta.onClick?.()
        }}
        className={className}
      >
        {cta.label}
      </button>
    )
  }
  return (
    <Link href={cta.href ?? "#"} onClick={onNavigate} className={className}>
      {cta.label}
    </Link>
  )
}

export function ShellNavbar({ logo, links, cta, secondaryCta, className }: ShellNavbarProps) {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  // SSR gate for the portal: false on the server, true after hydration.
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const menuId = React.useId()
  const pathname = usePathname()
  // Motion's reducedMotion="user" keeps opacity fades; the shell contract is
  // "instant", so under reduced motion the reveal variants drop entirely.
  const reduceMotion = useReducedMotion()

  // Route change closes the menu — state adjustment during render, not an
  // effect, so navigation never paints an open panel first.
  const [lastPathname, setLastPathname] = React.useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpen(false)
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Menu lifecycle: Escape closes; body scroll locks, restoring the previous
  // value rather than blanking it; focus moves to the close button and back
  // to the trigger on close.
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        return
      }
      // aria-modal promises containment — wrap Tab within the panel (and
      // recapture focus if it somehow left).
      if (e.key !== "Tab" || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      const inside = panelRef.current.contains(active)
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
      // Skip the focus return when the trigger is display:none (e.g. the
      // close came from crossing the desktop breakpoint).
      const trigger = triggerRef.current
      if (trigger && trigger.offsetParent !== null) trigger.focus()
    }
  }, [open])

  // The open panel never outlives its context: rotation and crossing the
  // desktop breakpoint close it (route changes handled above at render time).
  React.useEffect(() => {
    if (!open) return
    const mq = window.matchMedia("(min-width: 768px)")
    const close = () => setOpen(false)
    mq.addEventListener("change", close)
    window.addEventListener("orientationchange", close)
    return () => {
      mq.removeEventListener("change", close)
      window.removeEventListener("orientationchange", close)
    }
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 [--nav-bg:hsl(0_0%_100%/0.72)] [--nav-blur:14px] [--nav-height:64px] md:[--nav-height:72px]",
        "grid h-[var(--nav-height)] w-full grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]",
        "bg-[var(--nav-bg)] text-[var(--nav-fg,inherit)] [-webkit-backdrop-filter:saturate(140%)_blur(var(--nav-blur))] [backdrop-filter:saturate(140%)_blur(var(--nav-blur))]",
        "pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]",
        "border-b transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none",
        scrolled
          ? "border-black/10 shadow-[0_8px_30px_rgb(0_0_0/0.06)]"
          : "border-transparent",
        className
      )}
    >
      {/* Height-locked logo slot: the bar sizes the logo, never the reverse. */}
      <Link
        href="/"
        aria-label="Home"
        className="flex h-[calc(var(--nav-height)-24px)] max-w-[min(40vw,240px)] items-center justify-self-start [&_img]:h-full [&_img]:w-auto [&_img]:object-contain [&_svg]:h-full [&_svg]:w-auto"
      >
        {logo}
      </Link>

      <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="relative text-sm font-medium opacity-80 transition-opacity duration-200 after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:opacity-100 hover:after:scale-x-100 focus-visible:opacity-100 focus-visible:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center justify-self-end gap-3">
        {secondaryCta && (
          <CtaAction
            cta={secondaryCta}
            className="hidden items-center justify-center whitespace-nowrap rounded-md border border-transparent px-3 py-1.5 text-sm font-medium opacity-80 transition-opacity duration-200 hover:opacity-100 motion-reduce:transition-none md:inline-flex"
          />
        )}
        {cta && (
          <CtaAction
            cta={cta}
            className={cn(
              "hidden items-center justify-center whitespace-nowrap rounded-md border px-4 py-1.5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none md:inline-flex",
              scrolled
                ? "border-foreground bg-foreground text-background"
                : "border-current bg-transparent hover:bg-foreground/5"
            )}
          />
        )}
        <button
          ref={triggerRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          className="inline-flex size-9 items-center justify-center md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            className="size-5"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* Menu portals to <body>: ancestor overflow/transform can't clip it. */}
      {mounted &&
        createPortal(
          <MotionConfig reducedMotion="user">
            <div
              ref={panelRef}
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              inert={!open}
              className={cn(
                "fixed inset-0 z-[60] flex max-h-dvh flex-col overflow-y-auto bg-background text-foreground",
                "pb-[max(2.5rem,env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pt-[max(1.25rem,env(safe-area-inset-top))]",
                "transition-transform duration-300 ease-out motion-reduce:transition-none",
                open ? "translate-x-0" : "pointer-events-none translate-x-full"
              )}
            >
              <div className="flex justify-end">
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-10 items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                    className="size-6"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <motion.nav
                aria-label="Menu links"
                variants={reduceMotion ? undefined : stagger()}
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                className="mt-4 flex flex-col gap-1"
              >
                {links.map((l) => (
                  <motion.div key={l.href} variants={reduceMotion ? undefined : fadeUp}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-2xl font-medium"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                {cta && (
                  <motion.div variants={reduceMotion ? undefined : fadeUp}>
                    <CtaAction
                      cta={cta}
                      onNavigate={() => setOpen(false)}
                      className="mt-6 inline-flex items-center justify-center rounded-md border border-current px-5 py-2.5 text-lg font-medium"
                    />
                  </motion.div>
                )}
              </motion.nav>
            </div>
          </MotionConfig>,
          document.body
        )}
    </header>
  )
}
