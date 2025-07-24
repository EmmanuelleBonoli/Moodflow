import { apiClient } from './index';
import type { Task  } from '@moodflow/types';

export const taskApi = {
  create: (data: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) =>
    apiClient.post('/tasks', data),

  getToday: () =>
    apiClient.get('/tasks/today'),

  update: (id: string, data: Partial<Task>) =>
    apiClient.patch(`/tasks/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/tasks/${id}`),
};
