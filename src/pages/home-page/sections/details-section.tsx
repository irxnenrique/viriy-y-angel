import { Mail, Wine } from "lucide-react";
import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";
import { SectionHeading } from "@home-page/sections/section-heading";

export function DetailsSection() {
  const items = [
    { ...invitation.adultsOnly, icon: Wine, id: "adultos" },
    { ...invitation.gifts, icon: Mail, id: "regalos" },
  ];

  return (
    <section className="section details" id="detalles">
      <SectionHeading kicker="Para tomar en cuenta" title="Detalles" />
      <div className="details__grid">
        {items.map(({ id, title, body, icon: Icon }, index) => (
          <Reveal
            className="details__item"
            key={id}
            from="up"
            delay={index * 0.15}
          >
            <Icon size={28} strokeWidth={0.9} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
