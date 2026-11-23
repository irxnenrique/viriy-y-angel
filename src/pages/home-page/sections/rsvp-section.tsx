import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type FormEvent } from "react";
import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";
import { seatsLabel, type Guest } from "@home-page/hooks/use-guest";
import { SectionHeading } from "@home-page/sections/section-heading";

const MAX_WITHOUT_LINK = 10;

function buildMessage({
  name,
  attending,
  people,
  note,
  guest,
}: {
  name: string;
  attending: boolean;
  people: number;
  note: string;
  guest: Guest;
}) {
  const { bride, groom } = invitation.couple;
  const body = attending
    ? `Soy ${name} y con mucho gusto confirmo nuestra asistencia a su boda: ${people === 1 ? "1 persona" : `${people} personas`}${guest.seats ? ` de ${seatsLabel(guest.seats)} reservados` : ""}.`
    : `Soy ${name}. Con mucho cariño les aviso que no podremos acompañarlos en su boda.`;

  return [`¡Hola ${bride} y ${groom}!`, body, note && `Mensaje: ${note}`]
    .filter(Boolean)
    .join("\n");
}

export function RsvpSection({ guest }: { guest: Guest }) {
  const id = useId();
  const phone = invitation.rsvp.phone?.replace(/\D/g, "");
  const maxPeople = guest.seats ?? MAX_WITHOUT_LINK;
  const [name, setName] = useState(guest.name ?? "");
  const [attending, setAttending] = useState<boolean>();
  const [people, setPeople] = useState(String(guest.seats ?? 1));
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phone) return;
    if (!name.trim()) return setError("Escribe tu nombre o el de tu familia.");
    if (attending === undefined)
      return setError("Cuéntanos si podrás acompañarnos.");
    const count = Number.parseInt(people, 10);
    if (attending && !(count >= 1 && count <= maxPeople))
      return setError(
        `Indica cuántas personas asistirán (de 1 a ${maxPeople}).`,
      );

    setError("");
    const text = buildMessage({
      name: name.trim(),
      attending,
      people: count,
      note: note.trim(),
      guest,
    });
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const clearError = () => setError("");

  return (
    <section className="section rsvp" id="confirmar">
      <SectionHeading kicker="R.S.V.P." title="Confirma tu asistencia" />
      <Reveal from="fade" duration={1.2}>
        <p className="section-intro">{invitation.rsvp.body}</p>
        {invitation.rsvp.deadline && (
          <p className="kicker">Antes del {invitation.rsvp.deadline}</p>
        )}
      </Reveal>

      <Reveal from="up" delay={0.2}>
        <form className="rsvp-form" onSubmit={submit} noValidate>
          <div className="rsvp-form__field">
            <label className="rsvp-form__legend" htmlFor={`${id}-name`}>
              Nombre
            </label>
            <input
              id={`${id}-name`}
              className="rsvp-form__input"
              type="text"
              autoComplete="name"
              maxLength={80}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                clearError();
              }}
            />
          </div>

          <fieldset className="rsvp-form__field">
            <legend className="rsvp-form__legend">¿Nos acompañas?</legend>
            <div className="rsvp-form__choices">
              {(
                [
                  [true, "Sí, ahí estaré"],
                  [false, "No podré asistir"],
                ] as const
              ).map(([value, label]) => (
                <label className="rsvp-form__choice" key={String(value)}>
                  <input
                    type="radio"
                    name={`${id}-attending`}
                    checked={attending === value}
                    onChange={() => {
                      setAttending(value);
                      clearError();
                    }}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <AnimatePresence initial={false}>
            {attending && (
              <motion.div
                className="rsvp-form__field rsvp-form__reveal"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <label className="rsvp-form__legend" htmlFor={`${id}-people`}>
                  ¿Cuántas personas asistirán?
                  {guest.seats && (
                    <small> · {seatsLabel(guest.seats)} reservados</small>
                  )}
                </label>
                <input
                  id={`${id}-people`}
                  className="rsvp-form__input rsvp-form__input--number"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={maxPeople}
                  value={people}
                  onChange={(event) => {
                    setPeople(event.target.value);
                    clearError();
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rsvp-form__field">
            <label className="rsvp-form__legend" htmlFor={`${id}-note`}>
              Mensaje para los novios <small>(opcional)</small>
            </label>
            <textarea
              id={`${id}-note`}
              className="rsvp-form__input"
              rows={3}
              maxLength={300}
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </div>

          {error && (
            <p className="rsvp-form__error" role="alert">
              {error}
            </p>
          )}

          <button
            className="button button--solid"
            type="submit"
            disabled={!phone}
          >
            Confirmar por WhatsApp
          </button>
          {!phone && (
            <p className="rsvp-form__pending" role="status">
              La confirmación estará disponible muy pronto.
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
