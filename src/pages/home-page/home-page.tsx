import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { coupleNames, invitation } from "@data/invitation";
import { useGuest } from "@home-page/hooks/use-guest";
import { ClosingSection } from "@home-page/sections/closing-section";
import { CountdownSection } from "@home-page/sections/countdown-section";
import { DetailsSection } from "@home-page/sections/details-section";
import { DressCodeSection } from "@home-page/sections/dress-code-section";
import { FamilySection } from "@home-page/sections/family-section";
import { GallerySection } from "@home-page/sections/gallery-section";
import { HeroSection } from "@home-page/sections/hero-section";
import { IntroCover } from "@home-page/sections/intro-cover";
import {
  type MusicHandle,
  MusicToggle,
} from "@home-page/sections/music-toggle";
import { RsvpSection } from "@home-page/sections/rsvp-section";
import { ScheduleSection } from "@home-page/sections/schedule-section";
import { StorySection } from "@home-page/sections/story-section";
import { VenuesSection } from "@home-page/sections/venues-section";
import { WelcomeSection } from "@home-page/sections/welcome-section";

export function HomePage() {
  const guest = useGuest();
  const [opened, setOpened] = useState(false);
  const music = useRef<MusicHandle>(null);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <main className="invitation">
      <Helmet>
        <title>{`${coupleNames} · Nos casamos`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AnimatePresence>
        {!opened && (
          <IntroCover
            key="intro"
            guest={guest}
            onOpen={() => {
              window.scrollTo(0, 0);
              music.current?.start();
              setOpened(true);
            }}
          />
        )}
      </AnimatePresence>

      <HeroSection opened={opened} />
      <WelcomeSection guest={guest} />
      <CountdownSection />
      <StorySection />
      <FamilySection />
      <VenuesSection />
      <ScheduleSection />
      <DressCodeSection />
      <DetailsSection />
      <GallerySection />
      <RsvpSection guest={guest} />
      <ClosingSection />

      {invitation.music && (
        <MusicToggle src={invitation.music} ref={music} opened={opened} />
      )}
    </main>
  );
}
