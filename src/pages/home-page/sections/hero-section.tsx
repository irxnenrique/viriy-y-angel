import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import {
  coupleNames,
  eventDateLabel,
  eventDateShort,
  invitation,
} from "@data/invitation";
import lettering from "@app/assets/images/lettering-viry-angel-claro.png";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection({ opened }: { opened: boolean }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const show = opened || reduceMotion;
  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: show ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, delay, ease },
  });

  return (
    <section className="hero" id="inicio" ref={ref}>
      <motion.div
        className="hero__photo"
        style={reduceMotion ? undefined : { y: photoY }}
        initial={reduceMotion ? false : { scale: 1.18, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 2.6, ease }}
      >
        <picture>
          <source
            media="(min-width: 900px)"
            srcSet={invitation.images.hero.wide}
          />
          <img
            src={invitation.images.hero.tall}
            alt={coupleNames}
            fetchPriority="high"
          />
        </picture>
      </motion.div>

      <motion.div
        className="hero__content"
        style={
          reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
      >
        <motion.p className="kicker" {...fadeUp(0.9)}>
          Nos casamos
        </motion.p>
        <motion.h1 {...fadeUp(1.05)}>
          <img className="hero__lettering" src={lettering} alt={coupleNames} />
        </motion.h1>
        <motion.div className="hero__date" {...fadeUp(1.25)}>
          <span className="hero__rule" aria-hidden="true" />
          <strong>{eventDateShort}</strong>
          <span className="hero__rule" aria-hidden="true" />
        </motion.div>
        <motion.p className="hero__label" {...fadeUp(1.4)}>
          {eventDateLabel}
        </motion.p>
      </motion.div>

      <motion.a
        className="hero__cue"
        href="#bienvenida"
        aria-label="Continuar"
        {...fadeUp(1.8)}
      >
        <ChevronDown size={22} strokeWidth={1} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
