import {apiClient} from './index';
import type {Task} from '@moodflow/types';

export const taskApi = {
    create: (data: Partial<Task>): Promise<Task> =>
        apiClient.post('/task', data),

    update: (id: string, data: Partial<Task>) =>
        apiClient.patch(`/task/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/task/${id}`),
};
