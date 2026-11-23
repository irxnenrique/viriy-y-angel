import { Reveal } from "@components/reveal";

type ContentSectionProps = {
  id: string;
  title: string;
  body: string;
};

export function ContentSection({ id, title, body }: ContentSectionProps) {
  return (
    <section className="content-section section-shell" id={id}>
      <Reveal>
        <p className="section-kicker">Sección dummy</p>
        <h2>{title}</h2>
        <p>{body}</p>
      </Reveal>
    </section>
  );
}
