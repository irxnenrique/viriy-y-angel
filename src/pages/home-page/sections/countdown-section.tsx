import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { Reveal } from "@components/reveal";
import { eventDateLabel, eventStart } from "@data/invitation";
import { useCountdown } from "@hooks/use-countdown";
import { SectionHeading } from "@home-page/sections/section-heading";
import { downloadIcs, googleCalendarUrl } from "@home-page/utils/calendar";

function Digit({ value }: { value: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="countdown__digits">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={reduceMotion ? false : { y: "-60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduceMotion ? undefined : { y: "60%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function CountdownSection() {
  const remaining = useCountdown(eventStart);
  const units = [
    [Math.floor(remaining / 86_400_000), "Días"],
    [Math.floor(remaining / 3_600_000) % 24, "Horas"],
    [Math.floor(remaining / 60_000) % 60, "Minutos"],
    [Math.floor(remaining / 1000) % 60, "Segundos"],
  ] as const;

  return (
    <section className="section countdown" id="fecha">
      <SectionHeading kicker="Cuenta regresiva" title="Guarda la fecha" />
      <Reveal from="fade" duration={1.2}>
        <p className="countdown__date">{eventDateLabel}</p>
      </Reveal>

      <Reveal from="fade" duration={1.2}>
        {remaining > 0 ? (
          <div
            className="countdown__grid"
            role="timer"
            aria-label="Cuenta regresiva para la boda"
          >
            {units.map(([value, label]) => (
              <div className="countdown__unit" key={label}>
                <Digit value={String(value).padStart(2, "0")} />
                <span className="countdown__label">{label}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="quote">¡Hoy es el gran día!</p>
        )}
      </Reveal>

      <Reveal className="countdown__actions" from="up" delay={0.25}>
        <a
          className="button"
          href={googleCalendarUrl}
          target="_blank"
          rel="noreferrer"
        >
          <CalendarPlus size={14} strokeWidth={1.25} aria-hidden="true" />
          Google Calendar
        </a>
        <button className="button" type="button" onClick={downloadIcs}>
          <CalendarPlus size={14} strokeWidth={1.25} aria-hidden="true" />
          Apple / Outlook
        </button>
      </Reveal>
    </section>
  );
}
