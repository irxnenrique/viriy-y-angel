import type { Invitation } from "@app-types/invitation";
import balcon from "@app/assets/images/balcon.jpg";
import casaRoja from "@app/assets/images/casa-roja.jpg";
import frenteConFrente from "@app/assets/images/frente-con-frente.jpg";
import fuenteBeso from "@app/assets/images/fuente-beso.jpg";
import cartagena from "@app/assets/images/historia/cartagena.jpg";
import huacachina from "@app/assets/images/historia/huacachina.jpg";
import londres from "@app/assets/images/historia/londres.jpg";
import machuPicchu from "@app/assets/images/historia/machu-picchu.jpg";
import montanaSieteColores from "@app/assets/images/historia/montana-siete-colores.jpg";
import nuevaYork from "@app/assets/images/historia/nueva-york.jpg";
import paris from "@app/assets/images/historia/paris.jpg";
import roma from "@app/assets/images/historia/roma.jpg";
import venecia from "@app/assets/images/historia/venecia.jpg";

/*
 * Pending from the couple (see the production brief). Keep these as
 * placeholders; do not present them as confirmed information:
 * - Mass and reception times, and the full itinerary.
 * - Exact Google Maps pins for both venues.
 * - Chronological order and year of each trip in the story.
 * - Final copy for the envelope shower.
 * - WhatsApp number for RSVP and the deadline.
 * - Background song.
 */

export const invitation: Invitation = {
  couple: {
    bride: "Viry",
    groom: "Ángel",
    brideFull: "Carmen Viridiana Beas de la Cruz",
    groomFull: "Ángel Gabriel Aguilera Valencia",
  },
  date: "2027-01-23",
  time: undefined,
  utcOffset: "-06:00",
  yearsTogether: 16,
  quote:
    "Después de más de dieciséis años de conocernos, de crecer y de elegirnos todos los días, decidimos dar el siguiente paso. Y no lo imaginamos sin ustedes.",
  images: {
    hero: { wide: fuenteBeso, tall: casaRoja },
    closing: balcon,
    gallery: [
      { src: fuenteBeso, alt: "Viry y Ángel junto a la fuente" },
      { src: casaRoja, alt: "Viry y Ángel caminando de la mano" },
      { src: frenteConFrente, alt: "Viry y Ángel frente con frente" },
      { src: balcon, alt: "Viry y Ángel en el balcón" },
    ],
  },
  family: [
    {
      title: "Papás de la novia",
      people: ["Francisco Javier Beas Mendoza", "Elidia de la Cruz Gutiérrez"],
    },
    {
      title: "Papás del novio",
      people: [
        "Alfredo Ramón Aguilera Oros",
        "María Alejandra Valencia Zavala",
      ],
    },
    {
      title: "Padrinos de velación",
      people: [
        "Moisés Ayala Ramos",
        "Ma. Guadalupe Ramírez Quintero",
        "Salvador Aguilera Oros",
        "Martha Ortega Ledesma",
      ],
    },
  ],
  // Trips in the order the couple shared them.
  // TODO: confirm chronological order; add `when` (year) and `years` to each.
  story: {
    title: "Nuestra historia",
    intro: "La mayoría de ustedes la conoce… y sabe que fueron muchos años.",
    chapters: [
      {
        id: "venecia",
        title: "Venecia",
        place: "Italia",
        photo: venecia,
        focus: "50% 62%",
      },
      {
        id: "huacachina",
        title: "Huacachina",
        place: "Perú",
        photo: huacachina,
        focus: "45% 60%",
      },
      {
        id: "machu-picchu",
        title: "Machu Picchu",
        place: "Perú",
        photo: machuPicchu,
        focus: "45% 60%",
      },
      {
        id: "londres",
        title: "Londres",
        place: "Inglaterra",
        photo: londres,
        focus: "55% 55%",
      },
      {
        id: "paris",
        title: "París",
        place: "Francia",
        photo: paris,
        focus: "45% 50%",
      },
      {
        id: "nueva-york",
        title: "Nueva York",
        place: "Estados Unidos",
        photo: nuevaYork,
        focus: "50% 55%",
      },
      {
        id: "cartagena",
        title: "Cartagena",
        place: "Colombia",
        photo: cartagena,
        focus: "30% 60%",
      },
      {
        id: "roma",
        title: "Roma",
        place: "Italia",
        photo: roma,
        focus: "55% 60%",
      },
      {
        id: "siete-colores",
        title: "Montaña de Siete Colores",
        place: "Perú",
        photo: montanaSieteColores,
        focus: "45% 60%",
      },
      {
        id: "siguiente-paso",
        years: 16,
        title: "El siguiente paso",
        place: "Cihuatlán · La Central",
        body: "Después de tantos caminos juntos, ahora queremos decir que sí frente a quienes más queremos.",
        photo: fuenteBeso,
        focus: "52% 50%",
      },
    ],
  },
  // TODO: swap search links for the exact pins once the couple shares them.
  venues: [
    {
      id: "ceremonia",
      label: "Ceremonia religiosa",
      name: "Parroquia de la Santa Cruz",
      place: "Cihuatlán, Jalisco",
      icon: "church",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Parroquia+de+la+Santa+Cruz+Cihuatl%C3%A1n+Jalisco",
    },
    {
      id: "recepcion",
      label: "Recepción",
      name: "Rancho El Agave",
      place: "La Central, Colima",
      icon: "rings",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Rancho+El+Agave+La+Central+Colima",
    },
  ],
  // Empty until the mass time is confirmed; the section hides itself.
  schedule: [],
  dressCode: {
    title: "All Black",
    description:
      "Les pedimos acompañarnos vestidos completamente de negro. Formal, elegante y a su estilo.",
  },
  adultsOnly: {
    title: "Solo adultos",
    body: "Con todo el cariño, les compartimos que nuestra celebración será exclusiva para adultos. No se aceptan niños.",
  },
  // TODO: confirm the final envelope-shower copy with the couple.
  gifts: {
    title: "Lluvia de sobres",
    body: "Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, el día de la boda tendremos lluvia de sobres.",
  },
  rsvp: {
    phone: undefined,
    deadline: undefined,
    body: "Su presencia es muy importante para nosotros. Les pedimos confirmar su asistencia.",
  },
  music: undefined,
  closing:
    "Gracias por acompañarnos en esta historia. Nos vemos el 23 de enero para celebrar el siguiente paso.",
};

const eventDate = new Date(`${invitation.date}T12:00:00Z`);

/**
 * Countdown target. Without a confirmed time it counts down to the start of
 * the day, so the number of days stays right.
 */
export const eventStart = `${invitation.date}T${invitation.time ?? "00:00"}:00${invitation.utcOffset}`;

export const eventDateLabel = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(eventDate);

export const eventDateShort = [
  eventDate.getUTCDate(),
  eventDate.getUTCMonth() + 1,
  eventDate.getUTCFullYear() % 100,
]
  .map((part) => String(part).padStart(2, "0"))
  .join(" · ");

export const coupleNames = `${invitation.couple.bride} & ${invitation.couple.groom}`;
