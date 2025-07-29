import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { Task, TaskStatus, User } from '@prisma/client';
import { getStartAndEndOfToday } from '../../utils/utils';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(user: User, task: Task): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...task,
        userId: user.id,
      },
    });
  }

  async getPendingAndProgressTasks(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
        status: TaskStatus.pending || TaskStatus.in_progress,
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'asc' },
        { updatedAt: 'desc' },
      ],
    });
  }

  async getCompletedTasksOfToday(userId: string): Promise<Task[]> {
    const { startOfToday, endOfToday } = getStartAndEndOfToday();

    return this.prisma.task.findMany({
      where: {
        userId,
        status: TaskStatus.completed,
        updatedAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      orderBy: { completedAt: 'desc' },
    });
  }
}
