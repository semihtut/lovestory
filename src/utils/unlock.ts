/**
 * Countdown & unlock logic for the Feb 14 gate.
 *
 * Moscow is permanently UTC+3 (no DST since October 2014).
 * Target: February 14, 2026 00:00 MSK = February 13, 2026 21:00 UTC
 */
const UNLOCK_UTC_MS = Date.UTC(2026, 1, 13, 21, 0, 0);

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

/** Pure function — accepts `now` for testability. */
export function getTimeRemaining(now: number = Date.now()): TimeRemaining {
  const total = Math.max(0, UNLOCK_UTC_MS - now);
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, total };
}

export function isUnlocked(): boolean {
  if (import.meta.env.VITE_UNLOCK_OVERRIDE === 'true') return true;
  return Date.now() >= UNLOCK_UTC_MS;
}
