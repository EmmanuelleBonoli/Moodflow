import {apiClient} from './index';
import type {Task} from '@moodflow/types';

export const taskApi = {

    list: (page: number = 1, pageSize: number = 10): Promise<Task[]> =>
        apiClient.get(`/task?page=${page}&pageSize=${pageSize}`),

    create: (data: Partial<Task>): Promise<Task> =>
        apiClient.post('/task', data),

    update: (data: Partial<Task>): Promise<void> =>
        apiClient.patch(`/task/${data.id}`, data),

    delete: (id: string): Promise<void> =>
        apiClient.delete(`/task/${id}`),
};
