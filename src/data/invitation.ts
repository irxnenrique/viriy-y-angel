import type { Invitation } from "@app-types/invitation";

export const invitation: Invitation = {
  eyebrow: "Mis XV años",
  title: "Valentina",
  subtitle: "Te invito a celebrar conmigo una noche inolvidable",
  monogram: "V",
  introduction:
    "Con la bendición de Dios y el amor de mi familia, tengo el honor de invitarte a celebrar mis quince años.",
  eventType: "xv",
  honorees: ["Valentina"],
  date: "2027-03-20",
  time: "19:00",
  utcOffset: "-06:00",
  images: {
    hero: "/celebration-neutral.png",
    footer: "/celebration-neutral.png",
  },
  dressCode: {
    title: "Formal",
    description: "Te sugerimos evitar el color blanco y los tonos marfil.",
  },
  schedule: [
    { time: "19:00", title: "Recepción", detail: "Bienvenida y cóctel" },
    { time: "20:00", title: "Vals", detail: "Primer baile de la noche" },
    { time: "20:30", title: "Cena", detail: "Menú de tres tiempos" },
    { time: "22:00", title: "Fiesta", detail: "¡A bailar!" },
  ],
  venue: {
    name: "Salón Jardín Las Palmas",
    address: "Av. de las Flores 123, Col. Centro, Ciudad de México",
    mapUrl: "https://maps.google.com/?q=Ciudad+de+M%C3%A9xico",
  },
  rsvp: {
    phone: "+52 55 1234 5678",
    deadline: "1 de marzo de 2027",
  },
  sections: {
    details: {
      title: "Detalles del evento",
      body: "Acompáñanos en cada momento de esta celebración.",
    },
    venue: {
      title: "Lugar",
      body: "Te esperamos para compartir esta noche especial.",
    },
    rsvp: {
      title: "Confirma tu asistencia",
      body: "Tu presencia es muy importante para nosotros.",
    },
  },
};

export const eventDateLabel = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${invitation.date}T00:00:00Z`));
