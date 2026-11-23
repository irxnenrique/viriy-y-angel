import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";
import { SectionHeading } from "@home-page/sections/section-heading";

/** Renders nothing until `invitation.schedule` has items. */
export function ScheduleSection() {
  if (invitation.schedule.length === 0) return null;

  return (
    <section className="section schedule" id="itinerario">
      <SectionHeading kicker="El gran día" title="Itinerario" />
      <div className="schedule__list">
        {invitation.schedule.map((item, index) => (
          <Reveal
            className="schedule__item"
            key={`${item.time}-${item.title}`}
            from={index % 2 ? "right" : "left"}
          >
            <time>{item.time}</time>
            <span className="schedule__dot" aria-hidden="true" />
            <p>{item.title}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
