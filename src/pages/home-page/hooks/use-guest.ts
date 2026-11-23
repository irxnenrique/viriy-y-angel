import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export type Guest = {
  name?: string;
  seats?: number;
};

/** Reads the personalization carried in the link: `?n=Familia+López&p=4`. */
export function useGuest(): Guest {
  const [params] = useSearchParams();

  return useMemo(() => {
    const name = params.get("n")?.trim().slice(0, 80) || undefined;
    const seats = Number.parseInt(params.get("p") ?? "", 10);

    return {
      name,
      seats: Number.isInteger(seats) && seats > 0 ? seats : undefined,
    };
  }, [params]);
}

export function seatsLabel(seats: number) {
  return seats === 1 ? "1 lugar" : `${seats} lugares`;
}
