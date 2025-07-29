import {apiClient} from './index';
import type {Planning} from '@moodflow/types';

export const planningApi = {
    getToday: () => apiClient.get<Planning>('/planning/today'),

    getWeek: () => apiClient.get<Planning[]>('/planning/week'),

    create: (data: Omit<Planning, 'id' | 'createdAt' | 'updatedAt'>) =>
        apiClient.post<Planning>('/planning', data),

    update: (id: string, data: Partial<Omit<Planning, 'id' | 'createdAt' | 'updatedAt'>>) =>
        apiClient.patch<Planning>(`/planning/${id}`, data),

    delete: (id: string) => apiClient.delete(`/planning/${id}`),
}