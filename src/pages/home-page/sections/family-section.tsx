import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";
import { SectionHeading } from "@home-page/sections/section-heading";

export function FamilySection() {
  const { brideFull, groomFull } = invitation.couple;

  return (
    <section className="section family" id="familia">
      <SectionHeading
        kicker="Con la bendición de Dios y de nuestros padres"
        title="Nuestra familia"
      />

      <Reveal className="family__couple" from="fade" duration={1.4}>
        <p>{brideFull}</p>
        <span className="script" aria-hidden="true">
          &amp;
        </span>
        <span className="visually-hidden">y</span>
        <p>{groomFull}</p>
      </Reveal>

      <div className="family__groups">
        {invitation.family.map((group, index) => (
          <Reveal
            className="family__group"
            key={group.title}
            from="up"
            delay={index * 0.12}
          >
            <p className="kicker">{group.title}</p>
            <ul>
              {group.people.map((person) => (
                <li key={person}>{person}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
