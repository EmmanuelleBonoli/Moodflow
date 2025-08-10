import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { Prisma, Task, TaskStatus, User } from '@prisma/client';
import { DashboardTotal, TaskFilter } from '@moodflow/types';
import { getStartAndEndOfDay } from '../../utils/utils';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async createTask(user: User, task: Task): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...task,
        userId: user.id,
      },
    });
  }

  async countTasksTotal(
    userId: string,
    filters: TaskFilter = { category: null, status: null },
  ): Promise<DashboardTotal> {
    const [totalTasks, totalCompletedTasks] = await Promise.all([
      this.prisma.task.count({
        where: { userId },
      }),
      this.prisma.task.count({
        where: {
          userId,
          status: TaskStatus.completed,
        },
      }),
    ]);

    const baseWhere = {
      userId,
      ...(filters.category ? { category: filters.category } : {}),
    };

    let filteredTasks: number;
    let filteredCompletedTasks: number;

    if (filters.status) {
      filteredTasks = await this.prisma.task.count({
        where: {
          ...baseWhere,
          status: filters.status,
        },
      });

      filteredCompletedTasks =
        filters.status === TaskStatus.completed ? filteredTasks : 0;
    } else {
      const [allFiltered, completedFiltered] = await Promise.all([
        this.prisma.task.count({
          where: baseWhere,
        }),
        this.prisma.task.count({
          where: {
            ...baseWhere,
            status: TaskStatus.completed,
          },
        }),
      ]);

      filteredTasks = allFiltered;
      filteredCompletedTasks = completedFiltered;
    }

    return {
      totalTasks,
      totalCompletedTasks,
      filteredTasks,
      filteredCompletedTasks,
    };
  }

  async getPaginatedTasks(
    userId: string,
    page: number = 1,
    pageSize: number = 10,
    filters: TaskFilter = { category: null, status: null },
  ): Promise<Task[]> {
    const offset: number = (page - 1) * pageSize;

    const baseWhere = {
      userId,
      ...(filters.category ? { category: filters.category } : {}),
    };

    // Si un statut est spécifié, on ne fait plus le mix actif/completed
    if (filters.status) {
      return this.prisma.task.findMany({
        where: {
          ...baseWhere,
          status: filters.status,
        },
        orderBy: this.getOrderForStatus(filters.status),
        skip: offset,
        take: pageSize,
      });
    }

    // Sinon, on applique la logique hybride active → puis completed
    const activeWhere = {
      ...baseWhere,
      status: { in: [TaskStatus.pending, TaskStatus.in_progress] },
    };

    const activeTasksCount = await this.prisma.task.count({
      where: activeWhere,
    });

    let activeTasks: Task[] = [];
    let completedTasks: Task[] = [];

    if (offset < activeTasksCount) {
      activeTasks = await this.prisma.task.findMany({
        where: activeWhere,
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'asc' },
          { updatedAt: 'desc' },
        ],
        skip: offset,
        take: pageSize,
      });

      const remaining = pageSize - activeTasks.length;

      if (remaining > 0) {
        completedTasks = await this.prisma.task.findMany({
          where: {
            ...baseWhere,
            status: TaskStatus.completed,
          },
          orderBy: { completedAt: 'desc' },
          take: remaining,
        });
      }
    } else {
      const completedOffset = offset - activeTasksCount;

      completedTasks = await this.prisma.task.findMany({
        where: {
          ...baseWhere,
          status: TaskStatus.completed,
        },
        orderBy: { completedAt: 'desc' },
        skip: completedOffset,
        take: pageSize,
      });
    }

    return [...activeTasks, ...completedTasks];
  }

  async getCompletedTasksOfDay(userId: string, date: Date): Promise<Task[]> {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date);

    return this.prisma.task.findMany({
      where: {
        userId,
        status: TaskStatus.completed,
        completedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { completedAt: 'desc' },
    });
  }

  async updateTask(id: string, task: Task): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: task,
    });
  }

  async deleteTask(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  private getOrderForStatus(
    status: TaskStatus,
  ): Prisma.TaskOrderByWithRelationInput[] {
    if (status === 'completed') {
      return [{ completedAt: 'desc' }];
    }
    return [{ priority: 'desc' }, { createdAt: 'asc' }, { updatedAt: 'desc' }];
  }
}
