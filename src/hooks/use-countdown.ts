import { useEffect, useState } from "react";

export function useCountdown(date: string) {
  const [remaining, setRemaining] = useState(() => getRemainingTime(date));

  useEffect(() => {
    const timer = window.setInterval(
      () => setRemaining(getRemainingTime(date)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [date]);

  return remaining;
}

function getRemainingTime(date: string) {
  return Math.max(new Date(date).getTime() - Date.now(), 0);
}
