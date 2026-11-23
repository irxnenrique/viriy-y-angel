export type Venue = {
  id: string;
  label: string;
  name: string;
  place: string;
  /** Leave undefined until the couple confirms it; the page shows "Por confirmar". */
  time?: string;
  icon: "church" | "rings";
  mapUrl: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
};

/** One stage of the 16-year story; `photo` is required, the rest is optional copy. */
export type StoryChapter = {
  id: string;
  /**
   * Years together when this happened, used by the scroll counter. When
   * omitted, the counter spreads the chapters evenly across the 16 years.
   */
  years?: number;
  /** Optional calendar year or date label, e.g. "2019". */
  when?: string;
  /** Shown as a small label above the title, e.g. the country. */
  place?: string;
  title: string;
  body?: string;
  photo: string;
  /** CSS object-position for framing the photo. */
  focus?: string;
};

export type Invitation = {
  couple: {
    bride: string;
    groom: string;
    brideFull: string;
    groomFull: string;
  };
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** HH:MM; undefined while the ceremony time is pending. */
  time?: string;
  utcOffset: string;
  yearsTogether: number;
  quote: string;
  images: {
    hero: { wide: string; tall: string };
    closing: string;
    gallery: { src: string; alt: string }[];
  };
  family: { title: string; people: string[] }[];
  story: { title: string; intro: string; chapters: StoryChapter[] };
  venues: Venue[];
  schedule: ScheduleItem[];
  dressCode: { title: string; description: string };
  adultsOnly: { title: string; body: string };
  gifts: { title: string; body: string };
  rsvp: { phone?: string; deadline?: string; body: string };
  music?: string;
  closing: string;
};
