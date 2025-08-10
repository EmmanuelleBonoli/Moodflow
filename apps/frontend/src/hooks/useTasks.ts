import {useQuery, useMutation, useQueryClient, QueryClient} from '@tanstack/react-query'
import {taskApi} from '@/services/api'
import {TaskFilter, Task, TaskOperationResponse, TaskDeleteResponse, TasksAndTotals} from '@moodflow/types'
import {normalizeDates, makeQueryParamsKey} from '@/utils/utils'

export const useTasks = (page: number, pageSize: number, filters: TaskFilter) => {
    const queryParamsKey: string = makeQueryParamsKey(page, pageSize, filters)

    return useQuery({
        queryKey: ['tasks', page, pageSize, filters],
        queryFn: async () => {
            const data: TasksAndTotals = await taskApi.list(queryParamsKey)
            return {
                tasks: normalizeDates(data.tasks),
                totals: data.totals
            }
        },
        staleTime: 2 * 60 * 1000,
    })
}

export const useCreateTask = () => {
    const queryClient: QueryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({task, queryParamsKey}: {
            task: Partial<Task>,
            queryParamsKey: string
        }): Promise<TaskOperationResponse> => {
            return await taskApi.create(task, queryParamsKey)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })
}

export const useUpdateTask = () => {
    const queryClient: QueryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({task, queryParamsKey}: {
            task: Task,
            queryParamsKey: string
        }): Promise<TaskOperationResponse> => {
            return await taskApi.update(task, queryParamsKey)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })
}

export const useDeleteTask = () => {
    const queryClient: QueryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({taskId, queryParamsKey}: {
            taskId: string,
            queryParamsKey: string
        }): Promise<TaskDeleteResponse> => {
            return await taskApi.delete(taskId, queryParamsKey)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })
}