import { motion, useReducedMotion, type Variants } from "framer-motion";
import { coupleNames, eventDateShort } from "@data/invitation";
import lettering from "@app/assets/images/lettering-viry-angel-claro.png";
import monogram from "@app/assets/images/monograma-va-claro.png";
import { seatsLabel, type Guest } from "@home-page/hooks/use-guest";

const ease = [0.22, 1, 0.36, 1] as const;
const draw = [0.45, 0.05, 0.25, 1] as const;

/**
 * Opening screen. An arch (like the ones at the hacienda in the photos) is
 * drawn around the monogram; on "Abrir invitación" the content fades and
 * the screen parts in two like a pair of doors.
 */
export function IntroCover({
  guest,
  onOpen,
}: {
  guest: Guest;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();

  const appear = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 12 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.45, ease } },
  });

  const door = (side: -1 | 1): Variants => ({
    hidden: { x: 0 },
    shown: { x: 0 },
    exit: {
      x: `${side * 100}%`,
      transition: { duration: 1.3, delay: 0.35, ease: [0.7, 0, 0.2, 1] },
    },
  });

  return (
    <motion.div
      className="intro-cover"
      role="dialog"
      aria-modal="true"
      aria-label={`Invitación a la boda de ${coupleNames}`}
      initial={reduceMotion ? "shown" : "hidden"}
      animate="shown"
      exit={reduceMotion ? { opacity: 0 } : "exit"}
    >
      <motion.div className="intro-cover__door" variants={door(-1)} />
      <motion.div
        className="intro-cover__door intro-cover__door--right"
        variants={door(1)}
      />

      <div className="intro-cover__content">
        <div className="intro-cover__arch">
          <svg viewBox="0 0 200 318" aria-hidden="true">
            <motion.path
              d="M8 300 V104 A92 92 0 0 1 192 104 V314"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                shown: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 2.4, ease: draw },
                },
                exit: { opacity: 0, transition: { duration: 0.4 } },
              }}
            />
            <motion.path
              d="M20 300 V108 A80 80 0 0 1 180 108 V314"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                shown: {
                  pathLength: 1,
                  opacity: 0.45,
                  transition: { duration: 2.4, delay: 0.25, ease: draw },
                },
                exit: { opacity: 0, transition: { duration: 0.4 } },
              }}
            />
          </svg>
          <motion.img
            className="intro-cover__monogram"
            src={monogram}
            alt=""
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
              shown: {
                clipPath: "inset(0 0% 0 0)",
                opacity: 1,
                transition: { duration: 1.8, delay: 0.6, ease: draw },
              },
              exit: { opacity: 0, scale: 0.96, transition: { duration: 0.5 } },
            }}
          />
          <motion.p className="intro-cover__kicker" variants={appear(1.6)}>
            Nos casamos
          </motion.p>
        </div>

        <motion.img
          className="intro-cover__lettering"
          src={lettering}
          alt={coupleNames}
          variants={appear(1.9)}
        />
        <motion.p className="intro-cover__date" variants={appear(2.1)}>
          {eventDateShort}
        </motion.p>

        {guest.name && (
          <motion.div className="intro-cover__guest" variants={appear(2.3)}>
            <span>Invitación para</span>
            <strong>{guest.name}</strong>
            {guest.seats && <em>{seatsLabel(guest.seats)}</em>}
          </motion.div>
        )}

        <motion.button
          className="button button--solid intro-cover__open"
          type="button"
          onClick={onOpen}
          autoFocus
          variants={appear(2.5)}
        >
          Abrir invitación
        </motion.button>
      </div>
    </motion.div>
  );
}
