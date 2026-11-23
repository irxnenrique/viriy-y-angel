import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";
import type { StoryChapter } from "@app-types/invitation";
import { SectionHeading } from "@home-page/sections/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;
const { chapters } = invitation.story;

/**
 * Years shown by the counter for each chapter. Chapters without an explicit
 * `years` are spread evenly between 1 and the total years together.
 */
const chapterYears = chapters.map(
  (chapter, index) =>
    chapter.years ??
    Math.round(
      1 +
        (index / Math.max(chapters.length - 1, 1)) *
          (invitation.yearsTogether - 1),
    ),
);

/**
 * Scroll progress (0–1 within the pinned track) where each chapter is fully
 * shown. The last one lands before the end so it can breathe a little.
 */
const stops = chapters.map((_, index) =>
  chapters.length > 1 ? (index / (chapters.length - 1)) * 0.86 : 0,
);
/** How much scroll each reveal takes; kept below the gap between stops. */
const REVEAL_SPAN =
  chapters.length > 1 ? (0.86 / (chapters.length - 1)) * 0.7 : 0;

/** The counter climbs while each new photo is being revealed, then holds. */
const counterInput = [0];
const counterOutput = [chapterYears[0] ?? 0];
chapterYears.slice(1).forEach((years, offset) => {
  const end = stops[offset + 1];
  counterInput.push(end - REVEAL_SPAN, end);
  counterOutput.push(chapterYears[offset], years);
});

/** Piecewise-linear lookup of the counter for a scroll progress value. */
function counterAt(value: number) {
  if (value <= counterInput[0]) return counterOutput[0];
  for (let index = 1; index < counterInput.length; index++) {
    const from = counterInput[index - 1];
    const to = counterInput[index];
    if (value <= to) {
      const t = to > from ? (value - from) / (to - from) : 1;
      return (
        counterOutput[index - 1] +
        (counterOutput[index] - counterOutput[index - 1]) * t
      );
    }
  }
  return counterOutput[counterOutput.length - 1];
}

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

function chapterKicker(chapter: StoryChapter) {
  return [chapter.when, chapter.place].filter(Boolean).join(" · ");
}

function yearsLabel(years: number, last: boolean) {
  const unit = years === 1 ? "año" : "años";
  return last ? `más de ${years} ${unit} juntos` : `${unit} juntos`;
}

function StoryPhoto({
  chapter,
  index,
  progress,
}: {
  chapter: StoryChapter;
  index: number;
  progress: MotionValue<number>;
}) {
  const end = stops[index];
  const start = Math.max(end - REVEAL_SPAN, 0);
  const zoomEnd = Math.min(end + REVEAL_SPAN * 2, 1);
  // Function transforms (not keyframe arrays) so framer-motion keeps them in
  // JS and clamps exactly; the hardware scroll-timeline path drifted with
  // many stacked layers and hid every photo at the end of the track.
  const clipPath = useTransform(progress, (value) => {
    const shown = clamp01((value - start) / Math.max(end - start, 0.0001));
    return `inset(${(1 - shown) * 100}% 0% 0% 0%)`;
  });
  const scale = useTransform(
    progress,
    (value) =>
      1.18 -
      0.18 * clamp01((value - start) / Math.max(zoomEnd - start, 0.0001)),
  );

  return (
    <motion.div
      className="story__photo"
      style={{ clipPath: index === 0 ? undefined : clipPath, zIndex: index }}
    >
      <motion.img
        src={chapter.photo}
        alt=""
        decoding="async"
        style={{ scale, objectPosition: chapter.focus }}
      />
    </motion.div>
  );
}

function PinnedStory() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const yearsValue = useTransform(scrollYProgress, counterAt);
  const [years, setYears] = useState(chapterYears[0] ?? 0);
  const [active, setActive] = useState(0);

  useMotionValueEvent(yearsValue, "change", (value) =>
    setYears(Math.round(value)),
  );
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    let next = 0;
    stops.forEach((stop, index) => {
      if (value >= stop - REVEAL_SPAN / 2) next = index;
    });
    setActive(next);
  });

  const chapter = chapters[active];
  const isLast = active === chapters.length - 1;

  return (
    <div
      className="story__track"
      ref={track}
      style={{ height: `${chapters.length * 65 + 70}svh` }}
    >
      <div className="story__sticky">
        <div className="story__photos">
          {chapters.map((item, index) => (
            <StoryPhoto
              key={item.id}
              chapter={item}
              index={index}
              progress={scrollYProgress}
            />
          ))}
          <div className="story__shade" aria-hidden="true" />
        </div>

        <div className="story__text">
          <div className="story__counter" aria-hidden="true">
            <span className="story__number">
              {String(years).padStart(2, "0")}
            </span>
            <span className="story__unit">{yearsLabel(years, isLast)}</span>
          </div>

          <div className="story__caption" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease }}
              >
                {chapterKicker(chapter) && (
                  <p className="kicker">{chapterKicker(chapter)}</p>
                )}
                <h3>{chapter.title}</h3>
                {chapter.body && <p>{chapter.body}</p>}
              </motion.div>
            </AnimatePresence>
          </div>

          <ol className="story__steps" aria-hidden="true">
            {chapters.map((item, index) => (
              <li
                key={item.id}
                className={index <= active ? "is-reached" : undefined}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/** Same content as a plain list, for guests who prefer reduced motion. */
function StaticStory() {
  return (
    <ol className="story__list">
      {chapters.map((chapter, index) => (
        <li key={chapter.id}>
          <Reveal from="fade">
            <img
              src={chapter.photo}
              alt=""
              loading="lazy"
              style={{ objectPosition: chapter.focus }}
            />
            <p className="kicker">
              {chapterKicker(chapter) ||
                `${chapterYears[index]} ${yearsLabel(chapterYears[index], false)}`}
            </p>
            <h3>{chapter.title}</h3>
            {chapter.body && <p>{chapter.body}</p>}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function StorySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="story" id="historia">
      <div className="section story__intro">
        <SectionHeading
          kicker={`Más de ${invitation.yearsTogether} años`}
          title={invitation.story.title}
        />
        <Reveal from="fade" duration={1.4}>
          <p className="section-intro">{invitation.story.intro}</p>
        </Reveal>
      </div>
      {reduceMotion ? <StaticStory /> : <PinnedStory />}
    </section>
  );
}
