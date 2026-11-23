import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@components/reveal";
import { invitation } from "@data/invitation";
import { SectionHeading } from "@home-page/sections/section-heading";

const photos = invitation.images.gallery;

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, onStep]);

  const photo = photos[index];

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={(event) => event.stopPropagation()}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 60)
              onStep(info.offset.x < 0 ? 1 : -1);
          }}
        />
      </AnimatePresence>
      <button
        ref={closeRef}
        className="lightbox__button lightbox__close"
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
      >
        <X size={20} strokeWidth={1.25} />
      </button>
      <button
        className="lightbox__button lightbox__prev"
        type="button"
        aria-label="Foto anterior"
        onClick={(event) => {
          event.stopPropagation();
          onStep(-1);
        }}
      >
        <ChevronLeft size={22} strokeWidth={1.25} />
      </button>
      <button
        className="lightbox__button lightbox__next"
        type="button"
        aria-label="Foto siguiente"
        onClick={(event) => {
          event.stopPropagation();
          onStep(1);
        }}
      >
        <ChevronRight size={22} strokeWidth={1.25} />
      </button>
      <p className="lightbox__count">
        {index + 1} / {photos.length}
      </p>
    </motion.div>
  );
}

export function GallerySection() {
  const [open, setOpen] = useState<number | null>(null);
  const rail = useRef<HTMLUListElement>(null);

  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null
          ? current
          : (current + delta + photos.length) % photos.length,
      ),
    [],
  );
  const close = useCallback(() => setOpen(null), []);

  const scrollRail = (direction: 1 | -1) => {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({
      left: direction * element.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  if (photos.length === 0) return null;

  return (
    <section className="gallery" id="galeria">
      <div className="section gallery__head">
        <SectionHeading kicker="Momentos" title="Galería" />
      </div>

      <Reveal from="fade" duration={1.4}>
        <ul className="gallery__rail" ref={rail}>
          {photos.map((photo, index) => (
            <li key={photo.src}>
              <button
                type="button"
                className="gallery__item"
                onClick={() => setOpen(index)}
                aria-label={`Ver foto: ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="gallery__controls">
        <button
          className="lightbox__button"
          type="button"
          aria-label="Desplazar a la izquierda"
          onClick={() => scrollRail(-1)}
        >
          <ChevronLeft size={20} strokeWidth={1.25} />
        </button>
        <button
          className="lightbox__button"
          type="button"
          aria-label="Desplazar a la derecha"
          onClick={() => scrollRail(1)}
        >
          <ChevronRight size={20} strokeWidth={1.25} />
        </button>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox index={open} onClose={close} onStep={step} />
        )}
      </AnimatePresence>
    </section>
  );
}
