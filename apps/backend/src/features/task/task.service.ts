import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { Task, TaskStatus, User } from '@prisma/client';
import { DashboardTotal } from '@moodflow/types';
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

  async countTasksTotal(userId: string): Promise<DashboardTotal> {
    const tasks: number = await this.prisma.task.count({
      where: { userId },
    });

    const completedTasks: number = await this.prisma.task.count({
      where: {
        userId,
        status: TaskStatus.completed,
      },
    });

    return {
      tasks,
      completedTasks,
    };
  }

  async getPaginatedTasks(
    userId: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<Task[]> {
    const offset: number = (page - 1) * pageSize;

    // Étape A : combien de tâches actives existent au total ?
    const activeTasksCount = await this.prisma.task.count({
      where: {
        userId,
        status: {
          in: [TaskStatus.pending, TaskStatus.in_progress],
        },
      },
    });

    let activeTasks: Task[] = [];
    let completedTasks: Task[] = [];

    // Cas 1 : on est encore dans les actives
    if (offset < activeTasksCount) {
      activeTasks = await this.prisma.task.findMany({
        where: {
          userId,
          status: {
            in: [TaskStatus.pending, TaskStatus.in_progress],
          },
        },
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'asc' },
          { updatedAt: 'desc' },
        ],
        skip: offset,
        take: pageSize,
      });

      const remainingSlots = pageSize - activeTasks.length;

      // On complète avec des completed si nécessaire
      if (remainingSlots > 0) {
        completedTasks = await this.prisma.task.findMany({
          where: {
            userId,
            status: TaskStatus.completed,
          },
          orderBy: { completedAt: 'desc' },
          take: remainingSlots,
        });
      }
    } else {
      // Cas 2 : on a épuisé toutes les actives → on passe aux completed
      const completedOffset = offset - activeTasksCount;

      completedTasks = await this.prisma.task.findMany({
        where: {
          userId,
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

  async updateTask(id: string, task: Task): Promise<void> {
    await this.prisma.task.update({
      where: { id },
      data: task,
    });
  }

  async deleteTask(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
