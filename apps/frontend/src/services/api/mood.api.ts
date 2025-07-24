import { apiClient } from './index';
import type { Mood  } from '@moodflow/types';

export const moodApi = {
  create: (data: Omit<Mood, 'id' | 'userId' | 'createdAt'>) =>
    apiClient.post('/moods', data),

  getTodayMood: () =>
    apiClient.get('/moods/today'),

  getHistory: (days: number = 7) =>
    apiClient.get(`/moods/history?days=${days}`),
};
