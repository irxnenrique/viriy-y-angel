import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";
import monogram from "@app/assets/images/monograma-va-claro.png";
import { seatsLabel, type Guest } from "@home-page/hooks/use-guest";

export function WelcomeSection({ guest }: { guest: Guest }) {
  return (
    <section className="section welcome" id="bienvenida">
      <Reveal from="zoom" duration={1.4}>
        <img className="welcome__monogram" src={monogram} alt="" />
      </Reveal>
      <Reveal from="fade" duration={1.6} delay={0.2}>
        <p className="quote">{invitation.quote}</p>
      </Reveal>

      {guest.name && (
        <Reveal className="welcome__guest" from="up" delay={0.3}>
          <p className="kicker">Esta invitación es para</p>
          <p className="welcome__guest-name">{guest.name}</p>
          {guest.seats && (
            <p className="welcome__seats">
              Hemos reservado <strong>{seatsLabel(guest.seats)}</strong> en su
              honor
            </p>
          )}
        </Reveal>
      )}
    </section>
  );
}
