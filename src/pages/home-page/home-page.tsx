import { motion, useReducedMotion } from "framer-motion";
import { invitation, eventDateLabel } from "@data/invitation";
import { Helmet } from "react-helmet-async";
import { EventDetailsSection } from "@home-page/sections/event-details-section";
import { HeroSection } from "@home-page/sections/hero-section";
import { RsvpSection } from "@home-page/sections/rsvp-section";
import { VenueSection } from "@home-page/sections/venue-section";

export function HomePage() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
    >
      <Helmet>
        <title>Invitación · Draft</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <HeroSection />
      <EventDetailsSection />
      <VenueSection />
      <RsvpSection />
      <footer
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(52,50,47,.74), rgba(94,89,81,.36)), url("${invitation.images.footer}")`,
        }}
      >
        <p>Los mejores momentos se comparten</p>
        <h2>
          {invitation.title} {invitation.subtitle}
        </h2>
        <span>{eventDateLabel}</span>
        <a
          className="footer-credit"
          href="https://maloba.mx"
          target="_blank"
          rel="noreferrer"
        >
          Diseñado por Maloba
        </a>
      </footer>
    </motion.main>
  );
}
