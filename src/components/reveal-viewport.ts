/**
 * Start animating once the element is ~15% up from the bottom edge, so the
 * motion happens where the guest is looking, not as it barely peeks in.
 */
export const REVEAL_VIEWPORT = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -15% 0px",
} as const;
