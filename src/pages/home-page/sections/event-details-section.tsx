import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";

export function EventDetailsSection() {
  return (
    <>
      <section className="family-section section" id="details">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">{invitation.sections.details.body}</p>
            <h2>{invitation.sections.details.title}</h2>
            <span className="flourish" aria-hidden="true">
              ✦
            </span>
          </div>
          <p className="intro-copy">{invitation.introduction}</p>
          <div className="family-grid" style={{ display: "block" }}>
            <span>Con cariño</span>
            <h3>{invitation.honorees.join(" & ")}</h3>
          </div>
        </Reveal>
      </section>
      <section className="dress-section section">
        <Reveal>
          <div className="dress-card">
            <div className="dress-icon" aria-hidden="true">
              ♢
            </div>
            <p className="eyebrow">Código de vestimenta</p>
            <h2>{invitation.dressCode.title}</h2>
            <p>{invitation.dressCode.description}</p>
          </div>
        </Reveal>
      </section>
      <section className="schedule-section section" id="itinerario">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">Cada momento cuenta</p>
            <h2>El gran día</h2>
            <span className="flourish" aria-hidden="true">
              ✦
            </span>
          </div>
          <div className="timeline">
            {invitation.schedule.map((item, index) => (
              <div className="timeline-row" key={`${item.time}-${index}`}>
                <time>{item.time}</time>
                <div className="timeline-marker">
                  <span>{index + 1}</span>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
