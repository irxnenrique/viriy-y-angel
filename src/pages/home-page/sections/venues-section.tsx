import { Church, Gem, MapPin } from "lucide-react";
import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";
import { SectionHeading } from "@home-page/sections/section-heading";

const icons = { church: Church, rings: Gem };

export function VenuesSection() {
  return (
    <section className="section venues" id="lugares">
      <SectionHeading kicker="Dónde y cuándo" title="La celebración" />

      <div className="venues__grid">
        {invitation.venues.map((venue, index) => {
          const Icon = icons[venue.icon];
          return (
            <Reveal
              className="venue-card"
              key={venue.id}
              from="up"
              delay={index * 0.15}
              duration={1.1}
            >
              <Icon size={30} strokeWidth={0.9} aria-hidden="true" />
              <p className="kicker">{venue.label}</p>
              <h3>{venue.name}</h3>
              <p className="venue-card__place">{venue.place}</p>
              <p className="venue-card__time">
                {venue.time ?? "Horario por confirmar"}
              </p>
              <a
                className="button"
                href={venue.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={14} strokeWidth={1.25} aria-hidden="true" />
                Ver ubicación
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
