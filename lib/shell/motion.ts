import type { Variants } from "motion/react"

/** Hive motion language. Consumers pass these to motion components as `variants`. Reduced motion is the consumer's job: wrap in <MotionConfig reducedMotion="user"> (Motion keeps opacity fades by design) or drop variants via useReducedMotion() when reveals must be instant. */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
}
