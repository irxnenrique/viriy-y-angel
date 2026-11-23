import { useState } from "react";
import { invitation } from "@data/invitation";

export function RsvpSection() {
  const [preview, setPreview] = useState(false);
  return (
    <section className="rsvp-section section" id="rsvp">
      <div className="section-heading">
        <p className="eyebrow">Queremos celebrar contigo</p>
        <h2>{invitation.sections.rsvp.title}</h2>
        <span className="flourish" aria-hidden="true">
          ✦
        </span>
      </div>
      <p>{invitation.sections.rsvp.body}</p>
      <form
        className="rsvp-form"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const name = String(data.get("name")).trim();
          if (!name) {
            const input = event.currentTarget.elements.namedItem(
              "name",
            ) as HTMLInputElement;
            input.setCustomValidity("Escribe tu nombre para continuar.");
            input.reportValidity();
            return;
          }
          if (!invitation.rsvp.phone) {
            setPreview(true);
            return;
          }
          const message = `Hola, soy ${name}. Confirmo mi asistencia a la celebración de ${invitation.honorees.join(" y ")} el ${invitation.date} para ${data.get("count")} persona(s).`;
          window.open(
            `https://wa.me/${invitation.rsvp.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
            "_blank",
            "noopener,noreferrer",
          );
        }}
      >
        <div className="rsvp-field">
          <label htmlFor="guest-name">Nombre completo</label>
          <input
            id="guest-name"
            name="name"
            placeholder="Escribe tu nombre"
            autoComplete="name"
            required
            maxLength={120}
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
        </div>
        <div className="rsvp-field">
          <label htmlFor="guest-count">Personas</label>
          <input
            id="guest-count"
            name="count"
            type="number"
            min="1"
            max="20"
            defaultValue="1"
            required
          />
        </div>
        <button className="primary-button" type="submit">
          {invitation.rsvp.phone
            ? "Confirmar por WhatsApp"
            : "Probar confirmación"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
        {!invitation.rsvp.phone && (
          <p className="rsvp-note" role="status">
            {preview
              ? "Vista previa completada. Esta invitación de ejemplo no envía ni guarda tus datos."
              : "Invitación de ejemplo · La confirmación estará disponible próximamente."}
          </p>
        )}
      </form>
    </section>
  );
}
