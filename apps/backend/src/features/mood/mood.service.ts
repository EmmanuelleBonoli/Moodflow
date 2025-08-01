import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { Mood, Task, User } from '@prisma/client';
import { MoodData, NewMood } from '@moodflow/types';
import { TaskService } from '../task/task.service';

@Injectable()
export class MoodService {
  constructor(
    private prisma: PrismaService,
    private taskService: TaskService,
  ) {}

  async getLastMood(userId: string): Promise<Mood | null> {
    return this.prisma.mood.findFirst({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getWeeklyMood(userId: string): Promise<MoodData[]> {
    const moods: Mood[] = await this.prisma.mood.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'asc',
      },
      take: 7,
    });

    const moodData: MoodData[] = [];

    for (const mood of moods) {
      const completedTasks: Task[] =
        await this.taskService.getCompletedTasksOfDay(
          userId,
          new Date(mood.date),
        );

      moodData.push({
        date: mood.date,
        mood: mood.value,
        taskCompleted: {
          total: completedTasks.length,
          tasksId: [...completedTasks.map(task => task.id)],
        },
      });
    }

    return moodData;
  }

  async createMood(user: User, newMood: NewMood): Promise<void> {
    const existingMood: Mood | null = await this.prisma.mood.findFirst({
      where: {
        date: newMood.date,
        userId: user.id,
      },
    });

    if (!existingMood) {
      await this.prisma.mood.create({
        data: {
          userId: user.id,
          value: newMood.mood,
          date: newMood.date,
        },
      });
    } else {
      await this.prisma.mood.update({
        where: {
          id: existingMood.id,
        },
        data: {
          ...existingMood,
          value: newMood.mood,
        },
      });
    }
  }
}
