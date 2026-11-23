import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";

/** Black in different finishes, so "all black" reads as texture, not absence. */
const textures = [
  { id: "satin", label: "Satín" },
  { id: "velvet", label: "Terciopelo" },
  { id: "crepe", label: "Crepé" },
  { id: "lace", label: "Encaje" },
];

/** The page sinks from charcoal into pure black as this section arrives. */
export function DressCodeSection() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const background = useTransform(
    scrollYProgress,
    [0, 1],
    ["#232027", "#050505"],
  );
  const titleSpacing = useTransform(
    scrollYProgress,
    [0.2, 1],
    ["0.4em", "0em"],
  );

  return (
    <motion.section
      className="section dress-code"
      id="vestimenta"
      ref={ref}
      style={reduceMotion ? undefined : { background }}
    >
      <Reveal from="fade">
        <p className="kicker">Código de vestimenta</p>
      </Reveal>
      <motion.h2
        className="dress-code__title"
        style={reduceMotion ? undefined : { letterSpacing: titleSpacing }}
      >
        {invitation.dressCode.title}
      </motion.h2>
      <Reveal from="fade" delay={0.2}>
        <p className="section-intro">{invitation.dressCode.description}</p>
      </Reveal>

      <div className="dress-code__textures">
        {textures.map((texture, index) => (
          <Reveal
            className={`dress-code__texture dress-code__texture--${texture.id}`}
            key={texture.id}
            from="zoom"
            delay={0.15 * index}
          >
            <span className="dress-code__swatch" aria-hidden="true" />
            <span className="dress-code__label">{texture.label}</span>
          </Reveal>
        ))}
      </div>
    </motion.section>
  );
}
