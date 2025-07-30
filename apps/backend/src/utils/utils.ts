import type { StartAndEndOfDay } from '@moodflow/types';

export function getStartAndEndOfDay(
  startOfDayData = new Date(),
): StartAndEndOfDay {
  const today: Date = startOfDayData;

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
}
