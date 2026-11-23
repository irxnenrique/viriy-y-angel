import { MapPin } from "lucide-react";
import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";

export function VenueSection() {
  return (
    <section className="venues-section section" id="venue">
      <Reveal>
        <div className="section-heading light">
          <p className="eyebrow">{invitation.sections.venue.body}</p>
          <h2>{invitation.sections.venue.title}</h2>
          <span className="flourish" aria-hidden="true">
            ✦
          </span>
        </div>
        <div className="venues-grid">
          <article className="venue-card">
            <div className="venue-copy">
              <p className="eyebrow">Recepción · {invitation.time} h</p>
              <h3>{invitation.venue.name}</h3>
              <p>{invitation.venue.address}</p>
              {invitation.venue.mapUrl && (
                <a
                  className="text-link"
                  href={invitation.venue.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Cómo llegar ↗
                </a>
              )}
            </div>
            <div className="venue-placeholder">
              <MapPin size={28} strokeWidth={1} aria-hidden="true" />
              <span>
                {invitation.venue.mapUrl
                  ? "Te esperamos para celebrar"
                  : "Ubicación por confirmar"}
              </span>
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
