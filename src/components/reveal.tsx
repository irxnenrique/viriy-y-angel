import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";
import type { PropsWithChildren } from "react";
import { REVEAL_VIEWPORT } from "@components/reveal-viewport";

export type RevealFrom = "up" | "down" | "left" | "right" | "zoom" | "fade";

const DISTANCE = 36;

const hiddenStates: Record<RevealFrom, TargetAndTransition> = {
  up: { opacity: 0, y: DISTANCE },
  down: { opacity: 0, y: -DISTANCE },
  left: { opacity: 0, x: -DISTANCE * 1.5 },
  right: { opacity: 0, x: DISTANCE * 1.5 },
  zoom: { opacity: 0, scale: 0.9 },
  fade: { opacity: 0 },
};

type RevealProps = PropsWithChildren<{
  className?: string;
  /** Direction the element travels from as it enters the viewport. */
  from?: RevealFrom;
  delay?: number;
  duration?: number;
}>;

export function Reveal({
  children,
  className = "",
  from = "up",
  delay = 0,
  duration = 0.9,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : hiddenStates[from]}
      whileInView={
        reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }
      }
      viewport={REVEAL_VIEWPORT}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
