import type { StartAndEndOfToday } from '@moodflow/types';

export function getStartAndEndOfToday(): StartAndEndOfToday {
  const today = new Date();

  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);

  return { startOfToday, endOfToday };
}
