import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { Task, TaskStatus, User } from '@prisma/client';
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
    const { startOfDay, endOfDay } = getStartAndEndOfDay();

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

  async countCompletedTasks(userId: string, date: Date): Promise<number> {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date);

    return this.prisma.task.count({
      where: {
        userId,
        completedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
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
