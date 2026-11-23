import { Volume2, VolumeX } from "lucide-react";
import { type Ref, useImperativeHandle, useRef, useState } from "react";

export type MusicHandle = { start: () => void };

/**
 * HomePage calls `start` from the "Abrir invitación" click, since browsers
 * only allow audio to begin inside a user gesture.
 */
export function MusicToggle({
  src,
  opened,
  ref,
}: {
  src: string;
  opened: boolean;
  ref: Ref<MusicHandle>;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [audible, setAudible] = useState(false);

  const sync = () => {
    const element = audio.current;
    setAudible(!!element && !element.paused && !element.muted);
  };

  const play = () => {
    const element = audio.current;
    if (!element) return;
    element.muted = false;
    element.play().catch(() => {});
  };

  useImperativeHandle(ref, () => ({
    start: () => {
      if (audio.current) audio.current.volume = 0.6;
      play();
    },
  }));

  const toggle = () => {
    const element = audio.current;
    if (!element) return;
    if (element.paused) play();
    else element.muted = !element.muted;
  };

  return (
    <>
      <audio
        ref={audio}
        src={src}
        loop
        preload="auto"
        onPlay={sync}
        onPause={sync}
        onVolumeChange={sync}
      />
      {opened && (
        <button
          className="music-toggle"
          type="button"
          onClick={toggle}
          aria-label={audible ? "Silenciar música" : "Activar música"}
          aria-pressed={!audible}
        >
          {audible ? (
            <Volume2 size={18} strokeWidth={1.25} />
          ) : (
            <VolumeX size={18} strokeWidth={1.25} />
          )}
        </button>
      )}
    </>
  );
}
