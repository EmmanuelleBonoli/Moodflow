import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { Mood } from '@prisma/client';
import { MoodData } from '@moodflow/types';
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
        date: 'desc',
      },
      take: 7,
    });

    const moodData: MoodData[] = [];

    for (const mood of moods) {
      const completedTasksCount: number =
        await this.taskService.countCompletedTasks(userId, new Date(mood.date));

      moodData.push({
        date: mood.date,
        mood: mood.value,
        productivity: completedTasksCount,
      });
    }

    return moodData;
  }
}
