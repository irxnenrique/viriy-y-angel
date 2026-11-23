import { SiteHeader } from "@components/site-header";
import { invitation, eventDateLabel } from "@data/invitation";
import { useCountdown } from "@app/hooks/use-countdown";

export function HeroSection() {
  const remaining = useCountdown(
    `${invitation.date}T${invitation.time}:00${invitation.utcOffset}`,
  );
  const units = [
    [Math.floor(remaining / 86400000), "Días"],
    [Math.floor(remaining / 3600000) % 24, "Horas"],
    [Math.floor(remaining / 60000) % 60, "Minutos"],
    [Math.floor(remaining / 1000) % 60, "Segundos"],
  ] as const;
  return (
    <section
      className="hero"
      id="inicio"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(52,50,47,.78), rgba(94,89,81,.28)), url("${invitation.images.hero}")`,
      }}
    >
      <SiteHeader />
      <div className="hero-content">
        <p className="hero-kicker">{invitation.eyebrow}</p>
        <h1>
          {invitation.title}
          <em>{invitation.subtitle}</em>
        </h1>
        <div className="hero-rule" aria-hidden="true">
          <span />
          <span className="flourish">✦</span>
          <span />
        </div>
        <p className="hero-date">
          {eventDateLabel} · {invitation.time} h
        </p>
        <div className="countdown" aria-label="Cuenta regresiva para el evento">
          {units.map(([value, label]) => (
            <div className="count-unit" key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <a className="scroll-cue" href="#details">
          Descubre los detalles <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
