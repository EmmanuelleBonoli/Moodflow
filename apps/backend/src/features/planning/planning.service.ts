import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { Planning } from '@prisma/client';
import { getStartAndEndOfToday } from '../../utils/utils';

@Injectable()
export class PlanningService {
  constructor(private prisma: PrismaService) {}

  getTodayPlanning(userId: string): Promise<Planning | null> {
    const { startOfToday } = getStartAndEndOfToday();

    return this.prisma.planning.findUnique({
      where: {
        userId_date: {
          userId,
          date: startOfToday,
        },
      },
      include: {
        planningTasks: true,
      },
    });
  }
}
