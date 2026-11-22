/** Widest screen treated as a phone; matches the `tablet` breakpoint (--breakpoint-tablet: 761px). */
export const PHONE_MAX_WIDTH = 760;

/** Whether the screen is phone-sized right now (read once where a budget is set at mount). */
export function isPhone() {
  return window.innerWidth <= PHONE_MAX_WIDTH;
}
