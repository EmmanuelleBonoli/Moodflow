import {apiClient} from './index';
import {Task, TaskDeleteResponse, TaskOperationResponse, TasksAndTotals} from '@moodflow/types';

export const taskApi = {

    list: (queryParams: string): Promise<TasksAndTotals> =>
        apiClient.get(`/task?${queryParams}`),

    create: (data: Partial<Task>, queryParams: string): Promise<TaskOperationResponse> =>
        apiClient.post(`/task?${queryParams}`, data),

    update: (data: Partial<Task>, queryParams: string): Promise<TaskOperationResponse> =>
        apiClient.patch(`/task/${data.id}?${queryParams}`, data),

    delete: (id: string, queryParams: string): Promise<TaskDeleteResponse> =>
        apiClient.delete(`/task/${id}?${queryParams}`),
};
