import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@components/reveal";
import { coupleNames, eventDateShort, invitation } from "@data/invitation";
import lettering from "@app/assets/images/lettering-viry-angel-claro.png";
import monogram from "@app/assets/images/monograma-va-claro.png";

export function ClosingSection() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <footer className="closing" ref={ref}>
      <div className="closing__photo">
        <motion.img
          src={invitation.images.closing}
          alt={`${coupleNames} en el balcón`}
          loading="lazy"
          style={reduceMotion ? undefined : { scale }}
        />
      </div>

      <div className="section closing__body">
        <Reveal from="fade" duration={1.4}>
          <p className="closing__thanks">Gracias</p>
        </Reveal>
        <Reveal from="fade" duration={1.6} delay={0.15}>
          <p className="quote">{invitation.closing}</p>
        </Reveal>
        {/* The signature is "written" left to right like the monogram. */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.img
            className="closing__lettering"
            src={lettering}
            alt={coupleNames}
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)" },
              shown: { clipPath: "inset(0 0% 0 0)" },
            }}
            transition={{ duration: 2, ease: [0.45, 0.05, 0.25, 1] }}
          />
        </motion.div>
        <Reveal from="zoom" delay={0.4}>
          <img className="closing__monogram" src={monogram} alt="" />
        </Reveal>
        <Reveal from="fade" delay={0.6}>
          <p className="kicker">{eventDateShort}</p>
        </Reveal>
      </div>

      <a
        className="closing__credit"
        href="https://maloba.mx"
        target="_blank"
        rel="noreferrer"
      >
        Diseñado por Maloba
      </a>
    </footer>
  );
}
