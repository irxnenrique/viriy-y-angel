import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { REVEAL_VIEWPORT } from "@components/reveal-viewport";

const ease = [0.22, 1, 0.36, 1] as const;

/** Small caps kicker, then a serif title that rises from behind a mask. */
export function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      className="section-heading"
      initial={reduceMotion ? false : "hidden"}
      whileInView="shown"
      viewport={REVEAL_VIEWPORT}
    >
      <motion.p
        className="kicker"
        variants={{
          hidden: { opacity: 0, letterSpacing: "0.6em" },
          shown: { opacity: 1, letterSpacing: "0.32em" },
        }}
        transition={{ duration: 1.4, ease }}
      >
        {kicker}
      </motion.p>
      <span className="section-heading__mask">
        <motion.h2
          variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
        >
          {title}
        </motion.h2>
      </span>
      <motion.span
        className="section-heading__rule"
        aria-hidden="true"
        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
        transition={{ duration: 1.2, delay: 0.4, ease }}
      />
    </motion.header>
  );
}
