export type Invitation = {
  eyebrow: string;
  title: string;
  subtitle: string;
  monogram: string;
  introduction: string;
  eventType: "xv" | "wedding" | "birthday" | "baptism" | "other";
  honorees: string[];
  date: string;
  time: string;
  utcOffset: string;
  images: { hero: string; footer: string };
  dressCode: { title: string; description: string };
  schedule: { time: string; title: string; detail: string }[];
  venue: { name: string; address: string; mapUrl?: string };
  rsvp: { phone?: string; deadline?: string };
  sections: {
    details: { title: string; body: string };
    venue: { title: string; body: string };
    rsvp: { title: string; body: string };
  };
};
